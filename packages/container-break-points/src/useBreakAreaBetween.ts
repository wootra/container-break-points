import { useCallback } from 'react';

import { useBreakAreaCommon } from './useBreakAreaCommon';
import { BreakArea, BreakPointSatisfyObj, BreakPtObj, TriggerFunc } from './types';

export const useBreakAreaBetween = <
	T extends BreakPointSatisfyObj = BreakPointSatisfyObj,
	U extends BreakPtObj<T> = BreakPtObj<T>,
	K extends keyof U = keyof U,
	AREA extends BreakArea<T, U, K> = BreakArea<T, U, K>,
>(
	id: K,
	from: AREA,
	to: AREA
) => {
	const triggerFunc: TriggerFunc<T, U, K> = useCallback(
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
	return useBreakAreaCommon<T, U, K>(id, triggerFunc);
};
