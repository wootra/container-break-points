import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { UPDATE_BREAK_AREA } from './consts';
import { BreakAreaContext, ContextState } from './BreakAreaProvider';
import { getMsgOwnerId } from './utils';
import { BreakArea, BreakAreaInfo, BreakPtObj } from './types';
export type TriggerFunc<T> = (current: BreakArea<T>, breakAreas: BreakAreaInfo<T>['breakAreas']) => boolean;

export const useBreakAreaCommon = <T, U extends BreakPtObj<T> = BreakPtObj<T>>(
	id: keyof U,
	triggerFunc: TriggerFunc<T>
) => {
	const { breakPointsRef, providerId } = useContext(BreakAreaContext) as ContextState<U>;
	const [isInBoundary, setInBoundary] = useState<boolean | null>(null);
	const msgId = useMemo(() => getMsgOwnerId(id as string), [id]);
	const isInBoundaryRef = useRef(isInBoundary);
	isInBoundaryRef.current = isInBoundary;
	useEffect(() => {
		const listener: EventListenerOrEventListenerObject = e => {
			const ev = e as CustomEvent;
			if (
				ev.type === UPDATE_BREAK_AREA &&
				ev.detail.id === msgId &&
				ev.detail.providerId === providerId.current
			) {
				const newVal = triggerFunc(ev.detail.current, breakPointsRef.current[id].breakAreas); // === breakArea;
				if (isInBoundaryRef.current !== newVal) {
					setTimeout(() => setInBoundary(newVal)); // use event queue to remove race condition.
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
