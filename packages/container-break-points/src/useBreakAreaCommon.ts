import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { UPDATE_BREAK_AREA } from './consts';
import { getBreakAreaContext } from './BreakAreaProvider';
import { getMsgOwnerId, isTriggerable } from './utils';
import { BreakPointChangeEventData, BreakPointSatisfyObj, TriggerFunc } from './types';

const emptyArr = [] as readonly string[];

export const useBreakAreaCommon = <T extends BreakPointSatisfyObj, K extends keyof T>(
	id: K,
	triggerFunc: TriggerFunc<T, K>
) => {
	const { breakPointsRef, providerId, dataRef } = useContext(getBreakAreaContext<T, K>());
	const breakAreas = breakPointsRef.current[id]?.breakAreas ?? emptyArr;
	const [isInBoundary, setInBoundary] = useState<boolean | null>(
		triggerFunc(dataRef.current[id] as string, breakAreas)
	);
	const msgId = useMemo(() => getMsgOwnerId<T, K>(id), [id]);
	const isInBoundaryRef = useRef(isInBoundary);
	isInBoundaryRef.current = isInBoundary;
	useEffect(() => {
		const listener: EventListenerOrEventListenerObject = e => {
			const ev = e as CustomEvent<BreakPointChangeEventData<T, K>>;
			if (ev.type === UPDATE_BREAK_AREA && ev.detail.id === msgId && ev.detail.providerId === providerId) {
				const breakAreas = breakPointsRef.current[id]?.breakAreas ?? emptyArr;
				const current = ev.detail.current;
				if (!isTriggerable<T, K>(breakAreas, current)) return;
				const newVal = triggerFunc(current, breakAreas);
				if (isInBoundaryRef.current !== newVal) {
					setInBoundary(newVal);
				}
			}
		};

		window.addEventListener(UPDATE_BREAK_AREA, listener);
		return () => {
			window.removeEventListener(UPDATE_BREAK_AREA, listener);
		};
	}, [msgId, triggerFunc]);

	return isInBoundary;
};
