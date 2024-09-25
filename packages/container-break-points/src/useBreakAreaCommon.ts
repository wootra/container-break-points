import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { UPDATE_BREAK_AREA } from './consts';
import { getBreakAreaContext } from './BreakAreaProvider';
import { getMsgOwnerId } from './utils';
import { BreakPointChangeEventData, BreakPointSatisfyObj, TriggerFunc } from './types';

export const useBreakAreaCommon = <T extends BreakPointSatisfyObj, K extends keyof T>(
	id: K,
	triggerFunc: TriggerFunc<T, K>
) => {
	const { breakPointsRef, providerId, dataRef } = useContext(getBreakAreaContext<T, K>());
	const [isInBoundary, setInBoundary] = useState<boolean | null>(null);
	const msgId = useMemo(() => getMsgOwnerId<T, K>(id), [id]);
	const isInBoundaryRef = useRef(isInBoundary);
	isInBoundaryRef.current = isInBoundary;
	useEffect(() => {
		const listener: EventListenerOrEventListenerObject = e => {
			const ev = e as CustomEvent<BreakPointChangeEventData<T, K>>;
			if (ev.type === UPDATE_BREAK_AREA && ev.detail.id === msgId && ev.detail.providerId === providerId) {
				const newVal = triggerFunc(ev.detail.current, breakPointsRef.current[id].breakAreas); // === breakArea;
				if (isInBoundaryRef.current !== newVal) {
					setTimeout(() => setInBoundary(newVal)); // use event queue to remove race condition.
				}
			}
		};

		if (!dataRef.current[id] || !breakPointsRef.current[id]?.breakAreas) {
			return;
		}
		const newVal = triggerFunc(dataRef.current[id], breakPointsRef.current[id]?.breakAreas); // === breakArea;
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
