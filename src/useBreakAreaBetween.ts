import { useCallback } from 'react';

import { useBreakAreaCommon, TriggerFunc } from './useBreakAreaCommon';
import { BreakAreaInfo } from './types';

export const useBreakAreaBetween = (id: string, from: string, to: string) => {
	const triggerFunc: TriggerFunc = useCallback(
		(current: string, breakAreas: BreakAreaInfo['breakAreas']) => {
			let startIdx = breakAreas.indexOf(from);
			let endIdx = breakAreas.indexOf(to);

			if (startIdx === -1) {
				console.error('from argument on useBreakAreaBetween is invalid. it should be one of ', breakAreas);
				return false;
			}
			if (endIdx === -1) {
				console.error('to argument on useBreakAreaBetween is invalid. it should be one of ', breakAreas);
				return false;
			}

			if (startIdx > endIdx) {
				// swap
				const temp = startIdx;
				startIdx = endIdx;
				endIdx = temp;
			}
			const currIdx = breakAreas.indexOf(current);
			return currIdx >= startIdx && currIdx <= endIdx;
		},
		[from, to]
	);
	return useBreakAreaCommon(id, triggerFunc);
};
