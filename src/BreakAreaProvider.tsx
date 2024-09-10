import { MutableRefObject, PropsWithChildren, createContext, useCallback, useMemo, useReducer, useRef } from 'react';
import type { BreakAreaInfo, BreakAreaStates } from './types';
import { UPDATE_BREAK_AREA } from './consts';
import { getMsgOwnerId } from './utils';

type ContextState = {
	setBreakArea: (id: string, width: number) => void;
	dataRef: MutableRefObject<BreakAreaStates<string>>;
	breakPointsRef: MutableRefObject<Readonly<Record<string, BreakAreaInfo>>>;
	providerId: MutableRefObject<string>;
};

export const BreakAreaContext = createContext<ContextState>({} as ContextState);

const getCurrBreakArea = (breakSizes: number[], breakAreas: string[], width: number) => {
	let idx = 0;
	for (const pt of breakSizes) {
		if (width <= pt) {
			break;
		}
		idx++;
	}
	return breakAreas[idx];
};

const BreakAreaProvider = ({
	breakPoints,
	children,
}: PropsWithChildren<{ breakPoints: Readonly<Record<string, BreakAreaInfo>> }>) => {
	const dataRef = useRef({}) as MutableRefObject<BreakAreaStates<string>>;
	const breakPointsRef = useRef(breakPoints);
	breakPointsRef.current = breakPoints;

	const providerId = useRef(Math.random().toString(36).substring(2, 15));
	const setBreakArea = useCallback((id: string, width: number) => {
		const obj = breakPoints[id];
		const _breakAreas = obj.breakAreas;
		const _breakSizes = obj.breakSizes;
		const current = getCurrBreakArea(_breakSizes, _breakAreas, width);
		if (current && (!dataRef.current[id] || current !== dataRef.current[id])) {
			dataRef.current = {
				...dataRef.current,
				[id]: current,
			};
			const msgId = getMsgOwnerId(id);
			window.dispatchEvent(
				new CustomEvent(UPDATE_BREAK_AREA, {
					detail: {
						id: msgId,
						providerId: providerId.current,
						current,
					},
				})
			);
		}
	}, []);

	const value = useMemo(() => ({ setBreakArea, dataRef, breakPointsRef, providerId }), [setBreakArea]);

	return <BreakAreaContext.Provider value={value}>{children}</BreakAreaContext.Provider>;
};

export { BreakAreaProvider };
