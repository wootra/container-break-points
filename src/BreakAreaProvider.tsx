import { MutableRefObject, PropsWithChildren, createContext, useCallback, useMemo, useReducer, useRef } from 'react';
import type { BreakAreaStates } from './types';
import { UPDATE_BREAK_AREA } from './consts';
import { getMsgOwnerId } from './utils';

type BreakAreaInfo = { breakSizes: number[]; breakAreas: string[] };
type ContextState = {
	setBreakArea: (id: string, width: number) => void;
	dataRef: MutableRefObject<BreakAreaStates<string>>;
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

const BreakAreaProvider = <T extends string>({
	breakPoints,
	children,
}: PropsWithChildren<{ breakPoints: Readonly<Record<T, BreakAreaInfo>> }>) => {
	const dataRef = useRef({}) as MutableRefObject<BreakAreaStates<T>>;
	const setBreakArea = useCallback((id: T, width: number) => {
		const obj = breakPoints[id];
		const _breakAreas = obj.breakAreas;
		const _breakSizes = obj.breakSizes;
		const current = getCurrBreakArea(_breakSizes, _breakAreas, width);
		if (current && (!dataRef.current[id] || current !== dataRef.current[id]?.current)) {
			dataRef.current = {
				...dataRef.current,
				[id]: {
					...dataRef.current[id],
					current,
					isInit: true,
				},
			};
			const msgId = getMsgOwnerId(id);
			window.dispatchEvent(
				new CustomEvent(UPDATE_BREAK_AREA, {
					detail: {
						id: msgId,
						current,
					},
				})
			);
		}
	}, []);

	const value = useMemo(() => ({ setBreakArea, dataRef }), [setBreakArea]);

	return <BreakAreaContext.Provider value={value as ContextState}>{children}</BreakAreaContext.Provider>;
};

export { BreakAreaProvider };
