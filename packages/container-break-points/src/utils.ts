import { BreakArea, BreakAreaInfo, BreakPointSatisfyObj } from './types';

export const getMsgOwnerId = <T extends BreakPointSatisfyObj, K extends keyof T>(id: K) => {
	return `break-area-hook-${id as string}`;
};

export const isTriggerable = <T extends BreakPointSatisfyObj, K extends keyof T>(
	list: BreakAreaInfo<T, K>['breakAreas'],
	item: BreakArea<T, K>
) => {
	if (!list || list.length === 0) return false; // not set
	if (!list.includes(item)) {
		console.error('breakArea in the argument is wrong. it should be one of ', list);
		return false;
	}
	return true;
};
