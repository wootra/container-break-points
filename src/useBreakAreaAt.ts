import { useContext, useEffect, useMemo, useState } from 'react';
import { UPDATE_BREAK_AREA } from './consts';
import { BreakAreaContext } from './BreakAreaProvider';
import { getMsgOwnerId } from './utils';

export const useBreakAreaAt = (id: string, breakArea: string) => {
	const { dataRef } = useContext(BreakAreaContext);
	const [isInBoundary, setInBoundary] = useState(dataRef.current?.[id]?.current === breakArea);
	const msgId = useMemo(() => getMsgOwnerId(id), [id]);
	useEffect(() => {
		const listener: EventListenerOrEventListenerObject = e => {
			const ev = e as CustomEvent;
			if (ev.type === UPDATE_BREAK_AREA) {
				if (ev.detail.id === msgId) {
					setInBoundary(ev.detail.current === breakArea);
				}
			}
		};
		window.addEventListener(UPDATE_BREAK_AREA, listener);
	}, [msgId]);

	return isInBoundary;
};
