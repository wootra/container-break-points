import { useCallback } from 'react';

import { useBreakAreaCommon, TriggerFunc } from './useBreakAreaCommon';
import { BreakPtObj } from './types';

export const useBreakAreaAt = <T, U extends BreakPtObj<T> = BreakPtObj<T>>(id: string, breakArea: string) => {
	const triggerFunc: TriggerFunc<U> = useCallback((current, breakAreas) => {
		if (!breakAreas.includes(breakArea)) {
			console.error('breakArea in the argument is wrong. it should be one of ', breakAreas);
			return false;
		}
		return current === breakArea;
	}, []);
	return useBreakAreaCommon(id, triggerFunc);
};
