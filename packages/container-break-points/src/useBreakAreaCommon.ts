import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { UPDATE_BREAK_AREA } from './consts';
import { getBreakAreaContext } from './BreakAreaProvider';
import { getMsgOwnerId } from './utils';
import { BreakPointChangeEventData, BreakPointSatisfyObj, BreakPtObj, TriggerFunc } from './types';

export const useBreakAreaCommon = <
	T extends BreakPointSatisfyObj = BreakPointSatisfyObj,
	U extends BreakPtObj<T> = BreakPtObj<T>,
	K extends keyof U = keyof U,
>(
	id: K,
	triggerFunc: TriggerFunc<T, U, K>
) => {
	const { breakPointsRef, providerId, dataRef } = useContext(getBreakAreaContext<T, U, K>());
	const [isInBoundary, setInBoundary] = useState<boolean | null>(null);
	const msgId = useMemo(() => getMsgOwnerId<T, U>(id), [id]);
	const isInBoundaryRef = useRef(isInBoundary);
	isInBoundaryRef.current = isInBoundary;
	useEffect(() => {
		const listener: EventListenerOrEventListenerObject = e => {
			const ev = e as CustomEvent<BreakPointChangeEventData<T, U, K>>;
			if (ev.type === UPDATE_BREAK_AREA && ev.detail.id === msgId && ev.detail.providerId === providerId) {
				const newVal = triggerFunc(ev.detail.current, breakPointsRef.current[id].breakAreas); // === breakArea;
				if (isInBoundaryRef.current !== newVal) {
					setTimeout(() => setInBoundary(newVal)); // use event queue to remove race condition.
				}
			}
		};
		const newVal = triggerFunc(dataRef.current[id as keyof T], breakPointsRef.current[id].breakAreas); // === breakArea;
		if (isInBoundaryRef.current !== newVal) {
			setTimeout(() => setInBoundary(newVal)); // use event queue to remove race condition.
		}

		window.addEventListener(UPDATE_BREAK_AREA, listener);
		return () => {
			window.removeEventListener(UPDATE_BREAK_AREA, listener);
		};
	}, [msgId, triggerFunc]);

	return isInBoundary;
};
