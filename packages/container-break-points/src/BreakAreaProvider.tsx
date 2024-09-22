import React, {
	MutableRefObject,
	PropsWithChildren,
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useRef,
} from 'react';
import type {
	BreakAreaInfo,
	BreakAreaStates,
	BreakPointChangeEventData,
	BreakPointSatisfyObj,
	BreakPtObj,
} from './types';
import { UPDATE_BREAK_AREA } from './consts';
import { getMsgOwnerId } from './utils';

export type ContextState<
	T extends BreakPointSatisfyObj = BreakPointSatisfyObj,
	U extends BreakPtObj<T> = BreakPtObj<T>,
	K extends keyof U = keyof U,
> = {
	setBreakArea: (id: K, width: number) => void;
	dataRef: MutableRefObject<BreakAreaStates<T, U>>;
	breakPointsRef: MutableRefObject<U>;
	providerId: string;
};

const BreakAreaContext = createContext({});

export function getBreakAreaContext<
	T extends BreakPointSatisfyObj,
	U extends BreakPtObj<T> = BreakPtObj<T>,
	K extends keyof U = keyof U,
>() {
	return BreakAreaContext as unknown as React.Context<ContextState<T, U, K>>;
}

const getCurrBreakArea = <
	T extends BreakPointSatisfyObj,
	U extends BreakPtObj<T> = BreakPtObj<T>,
	K extends keyof U = keyof U,
>(
	breakSizes: BreakAreaInfo<T, U, K>['breakSizes'],
	breakAreas: BreakAreaInfo<T, U, K>['breakAreas'],
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

const useValidateBreakPointsOptions = <
	T extends BreakPointSatisfyObj = BreakPointSatisfyObj,
	U extends BreakPtObj<T> = BreakPtObj<T>,
>(
	breakPoints: T
) => {
	const breakPointsRef = useRef<U>({} as U);

	useEffect(() => {
		Object.keys(breakPoints).forEach(id => {
			const { breakAreas, breakSizes } = breakPoints[id as keyof T];
			if (breakAreas.length - breakSizes.length !== 1) {
				console.error(
					'the breakPoints definition for ' +
						id +
						' is not valid. breakAreas.length should be 1 more than breakSizes.',
					'your breakPoints object is:',
					breakPoints
				);
			} else {
				breakPointsRef.current = breakPoints as unknown as U;
			}
		});
	}, [breakPoints]);

	return breakPointsRef;
};

const sendEventWhenBreakPtChanged = <
	T extends BreakPointSatisfyObj = BreakPointSatisfyObj,
	U extends BreakPtObj<T> = BreakPtObj<T>,
	K extends keyof U = keyof U,
>(
	id: K,
	current: U[K]['breakAreas'][number],
	providerId: string,
	dataRef: MutableRefObject<BreakAreaStates<T, U>>
) => {
	if (current && (!dataRef.current[id as K] || current !== dataRef.current[id as K])) {
		dataRef.current = {
			...dataRef.current,
			[id]: current,
		};
		const msgId = getMsgOwnerId<T, U>(id);
		window.dispatchEvent(
			new CustomEvent(UPDATE_BREAK_AREA, {
				detail: {
					id: msgId,
					providerId: providerId,
					current,
				} as BreakPointChangeEventData<T, U, K>,
			})
		);
	}
};

const BreakAreaProvider = <
	T extends BreakPointSatisfyObj = BreakPointSatisfyObj,
	U extends BreakPtObj<T> = BreakPtObj<T>,
	K extends keyof U = keyof U,
>({
	breakPoints,
	children,
}: PropsWithChildren<{ breakPoints: T }>) => {
	const dataRef = useRef({}) as MutableRefObject<BreakAreaStates<T, U>>;

	const breakPointsRef = useValidateBreakPointsOptions<T, U>(breakPoints);

	const providerId = useMemo(() => Math.random().toString(36).substring(2, 15), []);

	const setBreakArea = useCallback((id: K, width: number) => {
		const obj = (breakPoints as unknown as U)[id];
		const _breakAreas = obj.breakAreas;
		const _breakSizes = obj.breakSizes;
		const current = getCurrBreakArea<T, U>(_breakSizes, _breakAreas, width);
		sendEventWhenBreakPtChanged<T, U>(id, current, providerId, dataRef);
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
	const ConvertedContext = getBreakAreaContext<T, U, K>();
	return <ConvertedContext.Provider value={value}>{children}</ConvertedContext.Provider>;
};

const getBreakAreaProvider = <T extends BreakPointSatisfyObj>(breakPoints: T) => {
	return React.memo(({ children }: PropsWithChildren) => (
		<BreakAreaProvider breakPoints={breakPoints}>{children}</BreakAreaProvider>
	));
};

export { getBreakAreaProvider };
