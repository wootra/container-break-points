import { useCallback } from 'react';

import { useBreakAreaCommon } from './useBreakAreaCommon';
import { BreakArea, BreakPointSatisfyObj, BreakPtObj, TriggerFunc } from './types';

export const useBreakAreasUp = <
	T extends BreakPointSatisfyObj = BreakPointSatisfyObj,
	U extends BreakPtObj<T> = BreakPtObj<T>,
	K extends keyof U = keyof U,
	AREA extends BreakArea<T, U, K> = BreakArea<T, U, K>,
>(
	id: K,
	from: AREA
) => {
	const triggerFunc: TriggerFunc<T, U, K> = useCallback(
		(current, breakAreas) => {
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
	return useBreakAreaCommon<T, U, K>(id, triggerFunc);
};
