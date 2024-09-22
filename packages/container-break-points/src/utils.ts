import { BreakPointSatisfyObj, BreakPtObj } from './types';

export const getMsgOwnerId = <
	T extends BreakPointSatisfyObj = BreakPointSatisfyObj,
	U extends BreakPtObj<T> = BreakPtObj<T>,
>(
	id: keyof U
) => {
	return `break-area-hook-${id as string}`;
};
