import { useCallback } from 'react';

import { useBreakAreaCommon } from './useBreakAreaCommon';
import { BreakArea, BreakPointSatisfyObj, TriggerFunc } from './types';

export const useBreakAreaBetween = <
	T extends BreakPointSatisfyObj,
	K extends keyof T,
	AREA extends BreakArea<T, K> = BreakArea<T, K>,
>(
	id: K,
	from: AREA,
	to: AREA
) => {
	const triggerFunc: TriggerFunc<T, K> = useCallback(
		(current, breakAreas) => {
			let startIdx = breakAreas.indexOf(from as string);
			let endIdx = breakAreas.indexOf(to as string);

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
	return useBreakAreaCommon<T, K>(id, triggerFunc);
};
