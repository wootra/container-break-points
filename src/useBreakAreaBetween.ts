import { useCallback } from 'react';

import { useBreakAreaCommon, TriggerFunc } from './useBreakAreaCommon';
import { BreakArea, BreakPtObj } from './types';

export const useBreakAreaBetween = <
	T,
	U extends BreakPtObj<T> = BreakPtObj<T>,
	AREA extends BreakArea<T> = BreakArea<T>
>(
	id: keyof U,
	from: AREA,
	to: AREA
) => {
	const triggerFunc: TriggerFunc<T> = useCallback(
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
	return useBreakAreaCommon(id, triggerFunc);
};
