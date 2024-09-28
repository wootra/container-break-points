import React, { MutableRefObject, PropsWithChildren, createContext, useCallback, useMemo, useRef } from 'react';
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

const useValidateBreakPointsOptions = <T extends BreakPointSatisfyObj, K extends keyof T>(
	breakPoints: T,
	initWidth?: number
) => {
	const handled = useMemo(() => {
		const isValid = Object.keys(breakPoints).every(id => {
			const { breakAreas, breakSizes } = breakPoints[id as keyof T] ?? {};
			if (!breakAreas || !breakSizes) {
				console.error(
					'the breakPoints definition for ' + id + ' is not valid. breakAreas and breakSizes are required.',
					'your breakPoints object is:',
					breakPoints
				);
				return false;
			}
			if (breakAreas.length - breakSizes.length !== 1) {
				console.error(
					'the breakPoints definition for ' +
						id +
						' is not valid. breakAreas.length should be 1 more than breakSizes.',
					'your breakPoints object is:',
					breakPoints
				);
				return false;
			}

			return true;
		});
		if (isValid) {
			return Object.keys(breakPoints).reduce((obj, key) => {
				const { breakAreas, breakSizes } = breakPoints[key];
				obj[key] = {
					...breakPoints[key],
					init: initWidth === undefined ? undefined : getCurrBreakArea(breakSizes, breakAreas, initWidth),
				};
				return obj;
			}, {} as any) as BreakPtObj<T, K>;
		} else {
			return breakPoints as unknown as BreakPtObj<T, K>;
		}
	}, [breakPoints, initWidth]);
	const breakPointsRef = useRef<BreakPtObj<T, K>>(handled);

	return breakPointsRef;
};

const sendEventWhenBreakPtChanged = <T extends BreakPointSatisfyObj, K extends keyof T>(
	id: K,
	current: BreakPtObj<T, K>[K]['breakAreas'][number],
	providerId: string,
	dataRef: MutableRefObject<BreakAreaStates<T, K>>
) => {
	if (current && (!dataRef.current[id] || current !== dataRef.current[id])) {
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

const getInitBreakAreas = <T extends BreakPointSatisfyObj>(breakPoints: T, initWidth: number) => {
	return Object.keys(breakPoints).reduce((obj, key) => {
		const { breakAreas, breakSizes } = breakPoints[key];
		obj[key] = getCurrBreakArea(breakSizes, breakAreas, initWidth);
		return obj;
	}, {} as any) as BreakAreaStates<T, keyof T>;
};

const BreakAreaProvider = <T extends BreakPointSatisfyObj, K extends keyof T>({
	breakPoints,
	initWidth,
	children,
}: PropsWithChildren<{ breakPoints: T; initWidth?: number }>) => {
	const dataRef = useRef(
		initWidth === undefined ? {} : getInitBreakAreas(breakPoints, initWidth)
	) as MutableRefObject<BreakAreaStates<T, K>>;

	const breakPointsRef = useValidateBreakPointsOptions<T, K>(breakPoints, initWidth);

	const providerId = useMemo(() => Math.random().toString(36).substring(2, 15), []);

	const setBreakArea = useCallback((id: K, width: number) => {
		const { breakSizes, breakAreas } = (breakPoints as unknown as BreakPtObj<T, K>)[id];
		const current = getCurrBreakArea<T, K>(breakSizes, breakAreas, width) as BreakPtObj<
			T,
			K
		>[K]['breakAreas'][number];
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
	return React.memo(({ children, initWidth }: PropsWithChildren<{ initWidth?: number }>) => (
		<BreakAreaProvider breakPoints={breakPoints} initWidth={initWidth}>
			{children}
		</BreakAreaProvider>
	)) as ({ children }: PropsWithChildren<{ initWidth?: number }>) => JSX.Element;
};

export { getBreakAreaProvider };
