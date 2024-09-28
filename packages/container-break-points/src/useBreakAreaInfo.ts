import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { UPDATE_BREAK_AREA } from './consts';
import { getBreakAreaContext } from './BreakAreaProvider';
import { getMsgOwnerId } from './utils';
import { BreakPointSatisfyObj, BreakArea } from './types';
const emptyArr = [] as readonly string[];

export const useBreakAreaInfo = <
	T extends BreakPointSatisfyObj,
	K extends keyof T,
	AREA extends BreakArea<T, K> = BreakArea<T, K>,
>(
	id: K
) => {
	const { breakPointsRef, providerId, dataRef } = useContext(getBreakAreaContext<T, K>());

	const [current, setCurrent] = useState<AREA>((breakPointsRef.current[id] as any)?.init as AREA);
	const msgId = useMemo(() => getMsgOwnerId(id as string), [id]);
	const savedCurrRef = useRef((breakPointsRef.current[id] as any)?.init);
	savedCurrRef.current = current;

	useEffect(() => {
		setTimeout(() => {
			if (dataRef.current?.[id]) {
				setCurrent(dataRef.current[id] as AREA);
			}
		});
		const listener: EventListenerOrEventListenerObject = e => {
			const ev = e as CustomEvent;
			if (ev.type === UPDATE_BREAK_AREA && ev.detail.id === msgId && ev.detail.providerId === providerId) {
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
			const breakAreas = breakPointsRef.current?.[id]?.breakAreas ?? emptyArr;
			if (breakAreas.length === 0) return false;
			if (!breakAreas.includes(at)) {
				console.error('from argument on isBreakAt is invalid. it should be one of  ', breakAreas);
				return false;
			}
			return current === at;
		},
		[current, id]
	);

	const isBreakBetween = useCallback(
		(from: AREA, to: AREA) => {
			const breakAreas = breakPointsRef.current?.[id]?.breakAreas ?? emptyArr;
			if (breakAreas.length === 0) return false;

			let startIdx = breakAreas.indexOf(from);
			let endIdx = breakAreas.indexOf(to);

			if (startIdx === -1) {
				console.error('from argument on isBreakBetween is invalid. it should be one of ', breakAreas);
				return false;
			}
			if (endIdx === -1) {
				console.error('to argument on isBreakBetween is invalid. it should be one of ', breakAreas);
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
			const breakAreas = breakPointsRef.current?.[id]?.breakAreas ?? emptyArr;
			if (breakAreas.length === 0) return false;

			const startIdx = breakAreas.indexOf(from);
			if (startIdx === -1) {
				console.error('from argument on isBreakUp is invalid. it should be one of ', breakAreas);
				return false;
			}
			const currIdx = breakAreas.indexOf(current);
			return currIdx >= startIdx;
		},
		[id, current]
	);

	const isBreakDown = useCallback(
		(from: AREA) => {
			const breakAreas = breakPointsRef.current?.[id]?.breakAreas ?? emptyArr;
			if (breakAreas.length === 0) return false;
			let startIdx = breakAreas.indexOf(from);
			if (startIdx === -1) {
				console.error('from argument on isBreakDown is invalid. it should be one of ', breakAreas);
				return false;
			}
			const currIdx = breakAreas.indexOf(current);
			return currIdx <= startIdx;
		},
		[id, current]
	);
	return { data: dataRef.current, current, isBreakAt, isBreakBetween, isBreakUp, isBreakDown };
};
