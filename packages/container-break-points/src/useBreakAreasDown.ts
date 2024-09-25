import { useCallback } from 'react';

import { useBreakAreaCommon } from './useBreakAreaCommon';
import { BreakArea, BreakPointSatisfyObj, TriggerFunc } from './types';

export const useBreakAreasDown = <
	T extends BreakPointSatisfyObj,
	K extends keyof T,
	AREA extends BreakArea<T, K> = BreakArea<T, K>,
>(
	id: K,
	from: AREA
) => {
	const triggerFunc: TriggerFunc<T, K> = useCallback(
		(current, breakAreas) => {
			let startIdx = breakAreas.indexOf(from);
			if (startIdx === -1) {
				console.error('from argument on useBreakAreasDown is invalid. it should be one of ', breakAreas);
				return false;
			}
			const currIdx = breakAreas.indexOf(current);
			return currIdx <= startIdx;
		},
		[from]
	);
	return useBreakAreaCommon<T, K>(id, triggerFunc);
};
