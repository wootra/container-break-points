import { BreakPointSatisfyObj, BreakPtObj } from './types';

export const getMsgOwnerId = <T extends BreakPointSatisfyObj, K extends keyof T>(id: K) => {
	return `break-area-hook-${id as string}`;
};
