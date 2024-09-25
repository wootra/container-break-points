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

export type ContextState<T extends BreakPointSatisfyObj, K extends keyof T> = {
	setBreakArea: (id: K, width: number) => void;
	dataRef: MutableRefObject<BreakAreaStates<T, K>>;
	breakPointsRef: MutableRefObject<BreakPtObj<T, K>>;
	providerId: string;
};

const BreakAreaContext = createContext({});

export function getBreakAreaContext<T extends BreakPointSatisfyObj, K extends keyof T>() {
	return BreakAreaContext as unknown as React.Context<ContextState<T, K>>;
}

const getCurrBreakArea = <T extends BreakPointSatisfyObj, K extends keyof T>(
	breakSizes: BreakAreaInfo<T, K>['breakSizes'],
	breakAreas: BreakAreaInfo<T, K>['breakAreas'],
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
	T extends BreakPointSatisfyObj,
	K extends keyof T,
	U extends BreakPtObj<T, K> = BreakPtObj<T, K>,
>(
	breakPoints: T
) => {
	const breakPointsRef = useRef<U>({} as U);

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
			} else {
				breakPointsRef.current = breakPoints as unknown as U;
			}
		});
	}, [breakPoints]);

	return breakPointsRef;
};

const sendEventWhenBreakPtChanged = <T extends BreakPointSatisfyObj, K extends keyof T>(
	id: K,
	current: BreakPtObj<T, K>[K]['breakAreas'][number],
	providerId: string,
	dataRef: MutableRefObject<BreakAreaStates<T, K>>
) => {
	if (current && (!dataRef.current[id] || current !== dataRef.current[id as K])) {
		dataRef.current = {
			...dataRef.current,
			[id]: current,
		};
		const msgId = getMsgOwnerId<T, K>(id);
		window.dispatchEvent(
			new CustomEvent(UPDATE_BREAK_AREA, {
				detail: {
					id: msgId,
					providerId: providerId,
					current,
				} as BreakPointChangeEventData<T, K>,
			})
		);
	}
};

const BreakAreaProvider = <T extends BreakPointSatisfyObj, K extends keyof T>({
	breakPoints,
	children,
}: PropsWithChildren<{ breakPoints: T }>) => {
	const dataRef = useRef({}) as MutableRefObject<BreakAreaStates<T, K>>;

	const breakPointsRef = useValidateBreakPointsOptions<T, K>(breakPoints);

	const providerId = useMemo(() => Math.random().toString(36).substring(2, 15), []);

	const setBreakArea = useCallback((id: K, width: number) => {
		const obj = (breakPoints as unknown as BreakPtObj<T, K>)[id];
		const _breakAreas = obj.breakAreas;
		const _breakSizes = obj.breakSizes;
		const current = getCurrBreakArea<T, K>(_breakSizes, _breakAreas, width);
		sendEventWhenBreakPtChanged<T, K>(id, current, providerId, dataRef);
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
	const ConvertedContext = getBreakAreaContext<T, K>();
	return <ConvertedContext.Provider value={value}>{children}</ConvertedContext.Provider>;
};

const getBreakAreaProvider = <T extends BreakPointSatisfyObj>(breakPoints: T) => {
	return React.memo(({ children }: PropsWithChildren) => (
		<BreakAreaProvider breakPoints={breakPoints}>{children}</BreakAreaProvider>
	));
};

export { getBreakAreaProvider };
