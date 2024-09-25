import { useCallback } from 'react';

import { useBreakAreaCommon } from './useBreakAreaCommon';
import { BreakArea, BreakPointSatisfyObj, TriggerFunc } from './types';

export const useBreakAreaAt = <
	T extends BreakPointSatisfyObj,
	K extends keyof T,
	AREA extends BreakArea<T, K> = BreakArea<T, K>,
>(
	id: K,
	breakArea: AREA
) => {
	const triggerFunc: TriggerFunc<T, K> = useCallback((current, breakAreas) => {
		if (!breakAreas.includes(breakArea)) {
			console.error('breakArea in the argument is wrong. it should be one of ', breakAreas);
			return false;
		}
		return current === breakArea;
	}, []);
	return useBreakAreaCommon<T, K>(id, triggerFunc);
};
