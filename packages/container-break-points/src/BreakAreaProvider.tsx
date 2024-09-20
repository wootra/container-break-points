import { MutableRefObject, PropsWithChildren, createContext, useCallback, useEffect, useMemo, useRef } from 'react';
import type { BreakAreaStates, BreakPtObj } from './types';
import { UPDATE_BREAK_AREA } from './consts';
import { getMsgOwnerId } from './utils';

export type ContextState<T, U extends BreakPtObj<T> = BreakPtObj<T>, K extends keyof U = keyof U> = {
	setBreakArea: (id: K, width: number) => void;
	dataRef: MutableRefObject<BreakAreaStates<K>>;
	breakPointsRef: MutableRefObject<T>;
	providerId: MutableRefObject<string>;
};

export const BreakAreaContext = createContext<ContextState<unknown>>({} as ContextState<unknown>);

const getCurrBreakArea = <U, T extends BreakPtObj<U> = BreakPtObj<U>>(
	breakSizes: T[keyof T]['breakSizes'],
	breakAreas: T[keyof T]['breakAreas'],
	width: number
) => {
	let idx = 0;
	for (const pt of breakSizes) {
		if (width <= pt) {
			break;
		}
		idx++;
	}
	return breakAreas[idx];
};

const useValidateBreakPointsOptions = <T, U extends BreakPtObj<T> = BreakPtObj<T>>(breakPoints: U) => {
	useEffect(() => {
		Object.keys(breakPoints).forEach(id => {
			const { breakAreas, breakSizes } = breakPoints[id];
			if (breakAreas.length - breakSizes.length !== 1) {
				console.error(
					'the breakPoints definition for ' +
						id +
						' is not valid. breakAreas.length should be 1 more than breakSizes.',
					'your breakPoints object is:',
					breakPoints
				);
			}
		});
	}, [breakPoints]);
};

const sendEventWhenBreakPtChanged = <
	T,
	U extends BreakPtObj<T> = BreakPtObj<T>,
	K extends keyof BreakAreaStates<T> = keyof BreakAreaStates<T>
>(
	id: keyof T,
	current: U[keyof U]['breakAreas'][number],
	providerId: MutableRefObject<string>,
	dataRef: MutableRefObject<BreakAreaStates<T>>
) => {
	if (current && (!dataRef.current[id as K] || current !== dataRef.current[id as K])) {
		dataRef.current = {
			...dataRef.current,
			[id]: current,
		};
		const msgId = getMsgOwnerId(id as string);
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
};

const BreakAreaProvider = <T, D extends BreakPtObj<T> = BreakPtObj<T>>({
	breakPoints,
	children,
}: PropsWithChildren<{ breakPoints: D }>) => {
	const dataRef = useRef({}) as MutableRefObject<BreakAreaStates<D>>;
	const breakPointsRef = useRef(breakPoints);
	breakPointsRef.current = breakPoints;

	useValidateBreakPointsOptions<T>(breakPoints);

	const providerId = useRef(Math.random().toString(36).substring(2, 15));
	const setBreakArea = useCallback((id: keyof D, width: number) => {
		const obj = breakPoints[id];
		const _breakAreas = obj.breakAreas;
		const _breakSizes = obj.breakSizes;
		const current = getCurrBreakArea(_breakSizes, _breakAreas, width);
		sendEventWhenBreakPtChanged<D>(id, current, providerId, dataRef);
	}, []);

	const value = useMemo(
		() => ({
			setBreakArea,
			dataRef,
			breakPointsRef,
			providerId,
		}),
		[setBreakArea]
	);

	return <BreakAreaContext.Provider value={value}>{children}</BreakAreaContext.Provider>;
};

export { BreakAreaProvider };
