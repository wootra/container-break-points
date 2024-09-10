import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { UPDATE_BREAK_AREA } from './consts';
import { BreakAreaContext } from './BreakAreaProvider';
import { getMsgOwnerId } from './utils';

export const useBreakAreaAt = (id: string, breakArea: string) => {
	const { dataRef } = useContext(BreakAreaContext);
	const [isInBoundary, setInBoundary] = useState(dataRef.current?.[id]?.current === breakArea);
	const msgId = useMemo(() => getMsgOwnerId(id), [id]);
	const setIsBoundaryRef = useRef(isInBoundary);
	setIsBoundaryRef.current = isInBoundary;
	useEffect(() => {
		const listener: EventListenerOrEventListenerObject = e => {
			const ev = e as CustomEvent;
			if (ev.type === UPDATE_BREAK_AREA && ev.detail.id === msgId) {
				const newVal = ev.detail.current === breakArea;
				if (setIsBoundaryRef.current !== newVal) {
					setTimeout(() => setInBoundary(newVal)); // use event queue to remove race condition.
				}
			}
		};
		window.addEventListener(UPDATE_BREAK_AREA, listener);
		return () => {
			window.removeEventListener(UPDATE_BREAK_AREA, listener);
		};
	}, [msgId]);

	return isInBoundary;
};
