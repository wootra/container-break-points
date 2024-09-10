import { useCallback } from 'react';

import { useBreakAreaCommon, TriggerFunc } from './useBreakAreaCommon';
import { BreakAreaInfo } from './types';

export const useBreakAreasUp = (id: string, from: string) => {
	const triggerFunc: TriggerFunc = useCallback(
		(current: string, breakAreas: BreakAreaInfo['breakAreas']) => {
			let startIdx = breakAreas.indexOf(from);
			if (startIdx === -1) {
				console.error('from argument on useBreakAreasDown is invalid. it should be one of ', breakAreas);
				return false;
			}
			const currIdx = breakAreas.indexOf(current);
			return currIdx >= startIdx;
		},
		[from]
	);
	return useBreakAreaCommon(id, triggerFunc);
};
