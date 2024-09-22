import { useCallback } from 'react';

import { useBreakAreaCommon } from './useBreakAreaCommon';
import { BreakArea, BreakPointSatisfyObj, BreakPtObj, TriggerFunc } from './types';

export const useBreakAreaAt = <
	T extends BreakPointSatisfyObj = BreakPointSatisfyObj,
	U extends BreakPtObj<T> = BreakPtObj<T>,
	K extends keyof U = keyof U,
	AREA extends BreakArea<T, U, K> = BreakArea<T, U, K>,
>(
	id: K,
	breakArea: AREA
) => {
	const triggerFunc: TriggerFunc<T, U, K> = useCallback((current, breakAreas) => {
		if (!breakAreas.includes(breakArea)) {
			console.error('breakArea in the argument is wrong. it should be one of ', breakAreas);
			return false;
		}
		return current === breakArea;
	}, []);
	return useBreakAreaCommon<T, U, K>(id, triggerFunc);
};
