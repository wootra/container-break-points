import { useCallback } from 'react';

import { useBreakAreaCommon, TriggerFunc } from './useBreakAreaCommon';
import { BreakArea, BreakAreaInfo, BreakPtObj } from './types';

export const useBreakAreasUp = <T, U extends BreakPtObj<T> = BreakPtObj<T>, AREA extends BreakArea<T> = BreakArea<T>>(
	id: string,
	from: string
) => {
	const triggerFunc: TriggerFunc<U> = useCallback(
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
	return useBreakAreaCommon(id, triggerFunc);
};
