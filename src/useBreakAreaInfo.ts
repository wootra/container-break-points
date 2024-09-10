import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { UPDATE_BREAK_AREA } from './consts';
import { BreakAreaContext } from './BreakAreaProvider';
import { getMsgOwnerId } from './utils';
import { BreakAreaInfo } from './types';

export const useBreakAreaInfo = (id: string) => {
	const { breakPointsRef, providerId } = useContext(BreakAreaContext);
	const [data, setData] = useState<BreakAreaInfo>({ breakAreas: [], breakSizes: [] } as BreakAreaInfo);
	const msgId = useMemo(() => getMsgOwnerId(id), [id]);
	const dataRef = useRef(data);
	const savedDataRef = useRef(data);
	dataRef.current = data;

	useEffect(() => {
		if (breakPointsRef.current) {
			savedDataRef.current = breakPointsRef.current[id];
			setData(breakPointsRef.current[id]);
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
			}
		};
		window.addEventListener(UPDATE_BREAK_AREA, listener);
		return () => {
			window.removeEventListener(UPDATE_BREAK_AREA, listener);
		};
	}, [msgId]);

	return data;
};
