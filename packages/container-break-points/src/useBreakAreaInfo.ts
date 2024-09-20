import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { UPDATE_BREAK_AREA } from './consts';
import { BreakAreaContext, ContextState } from './BreakAreaProvider';
import { getMsgOwnerId } from './utils';
import { BreakPtObj } from './types';

const a = Object.freeze({
	test: {
		breakAreas: ['aa', 'bb', 'cc'] as const,
		breakSizes: [100, 200] as const,
	},
});

export const useBreakAreaInfo = <
	T,
	U extends BreakPtObj<T> = BreakPtObj<T>,
	AREA extends U[keyof U]['breakAreas'][number] = U[keyof U]['breakAreas'][number],
>(
	id: keyof U
) => {
	const { breakPointsRef, providerId, dataRef } = useContext(BreakAreaContext) as ContextState<U>;
	const [data, setData] = useState({ breakAreas: [], breakSizes: [] } as unknown as U[keyof U]);
	const [current, setCurrent] = useState<string>('');
	const msgId = useMemo(() => getMsgOwnerId(id as string), [id]);
	// const dataRef = useRef(data);
	const savedCurrRef = useRef('');
	savedCurrRef.current = current;
	const savedDataRef = useRef<U[keyof U]>(data);
	// dataRef.current = data;

	useEffect(() => {
		if (breakPointsRef.current) {
			savedDataRef.current = breakPointsRef.current[id];
			setData(breakPointsRef.current[id]);
		}
		if (dataRef.current?.[id as string]) {
			setCurrent(dataRef.current[id as string]);
		}
		const listener: EventListenerOrEventListenerObject = e => {
			const ev = e as CustomEvent;
			if (
				ev.type === UPDATE_BREAK_AREA &&
				ev.detail.id === msgId &&
				ev.detail.providerId === providerId.current
			) {
				if (breakPointsRef.current?.[id] !== savedDataRef.current) {
					savedDataRef.current = breakPointsRef.current[id];
					setData(breakPointsRef.current[id]);
				}
				if (ev.detail.current !== savedCurrRef.current) {
					setCurrent(ev.detail.current);
				}
			}
		};
		window.addEventListener(UPDATE_BREAK_AREA, listener);
		return () => {
			window.removeEventListener(UPDATE_BREAK_AREA, listener);
		};
	}, [msgId]);

	const isBreakAt = useCallback(
		(at: AREA) => {
			const breakAreas = breakPointsRef.current?.[id]?.breakAreas ?? [];
			if (!breakAreas.includes(at)) {
				console.error('breakArea in the argument is wrong. it should be one of ', breakAreas);
				return false;
			}
			return current === at;
		},
		[current, id]
	);

	const isBreakBetween = useCallback(
		(from: AREA, to: AREA) => {
			const breakAreas = breakPointsRef.current?.[id]?.breakAreas ?? [];
			let startIdx = breakAreas.indexOf(from);
			let endIdx = breakAreas.indexOf(to);

			if (startIdx === -1) {
				console.error('from argument on useBreakAreaBetween is invalid. it should be one of ', breakAreas);
				return false;
			}
			if (endIdx === -1) {
				console.error('to argument on useBreakAreaBetween is invalid. it should be one of ', breakAreas);
				return false;
			}

			if (startIdx > endIdx) {
				// swap
				const temp = startIdx;
				startIdx = endIdx;
				endIdx = temp;
			}
			const currIdx = breakAreas.indexOf(current);
			return currIdx >= startIdx && currIdx <= endIdx;
		},
		[id, current]
	);

	const isBreakUp = useCallback(
		(from: AREA) => {
			const breakAreas = breakPointsRef.current?.[id]?.breakAreas ?? [];
			const startIdx = breakAreas.indexOf(from);
			if (startIdx === -1) {
				console.error('from argument on useBreakAreasDown is invalid. it should be one of ', breakAreas);
				return false;
			}
			const currIdx = breakAreas.indexOf(current);
			return currIdx >= startIdx;
		},
		[id, current]
	);

	const isBreakDown = useCallback(
		(from: AREA) => {
			const breakAreas = breakPointsRef.current?.[id]?.breakAreas ?? [];
			let startIdx = breakAreas.indexOf(from);
			if (startIdx === -1) {
				console.error('from argument on useBreakAreasDown is invalid. it should be one of ', breakAreas);
				return false;
			}
			const currIdx = breakAreas.indexOf(current);
			return currIdx <= startIdx;
		},
		[id, current]
	);
	return { data, current, isBreakAt, isBreakBetween, isBreakUp, isBreakDown };
};
