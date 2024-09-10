import { useCallback } from 'react';

import { useBreakAreaCommon, TriggerFunc } from './useBreakAreaCommon';
import { BreakAreaInfo } from './types';

export const useBreakAreaAt = (id: string, breakArea: string) => {
	const triggerFunc: TriggerFunc = useCallback((current: string, breakAreas: BreakAreaInfo['breakAreas']) => {
		if (!breakAreas.includes(breakArea)) {
			console.error('breakArea in the argument is wrong. it should be one of ', breakAreas);
			return false;
		}
		return current === breakArea;
	}, []);
	return useBreakAreaCommon(id, triggerFunc);
};
