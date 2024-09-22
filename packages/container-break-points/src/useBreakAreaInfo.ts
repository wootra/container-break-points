import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { UPDATE_BREAK_AREA } from './consts';
import { getBreakAreaContext } from './BreakAreaProvider';
import { getMsgOwnerId } from './utils';
import { BreakAreaInfo, BreakPointSatisfyObj, BreakPtObj, BreakArea } from './types';

export const useBreakAreaInfo = <
	T extends BreakPointSatisfyObj = BreakPointSatisfyObj,
	U extends BreakPtObj<T> = BreakPtObj<T>,
	K extends keyof U = keyof U,
	AREA extends BreakArea<T, U, K> = BreakArea<T, U, K>,
>(
	id: K
) => {
	const { breakPointsRef, providerId, dataRef } = useContext(getBreakAreaContext<T, U, K>());
	const [data, setData] = useState({ breakAreas: [], breakSizes: [] } as unknown as BreakAreaInfo<T, U, K>);
	const [current, setCurrent] = useState<string>('');
	const msgId = useMemo(() => getMsgOwnerId(id as string), [id]);
	const savedCurrRef = useRef('');
	savedCurrRef.current = current;
	const savedDataRef = useRef<BreakAreaInfo<T, U, K>>(data);

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
			if (ev.type === UPDATE_BREAK_AREA && ev.detail.id === msgId && ev.detail.providerId === providerId) {
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
