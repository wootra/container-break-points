type Immutable<T> = {
	readonly [K in keyof T]: Immutable<T[K]>;
};

export type BreakPointSatisfyObj = Immutable<{ [key: string]: { breakAreas: string[]; breakSizes: number[] } }>;

export type BreakAreasType<T extends Immutable<{ breakAreas: string[]; breakSizes: number[] }>> = {
	readonly breakAreas: T['breakAreas'] extends readonly string[] ? T['breakAreas'] : readonly string[];
	readonly breakSizes: T['breakSizes'] extends readonly number[] ? T['breakSizes'] : readonly number[];
};

export type BreakPtObj<T extends BreakPointSatisfyObj, K extends keyof T> = Pick<T, K>;

export type BreakAreas<T extends BreakPointSatisfyObj, K extends keyof T> = BreakPtObj<
	T,
	K
>[K]['breakAreas'] extends string[]
	? BreakPtObj<T, K>[K]['breakAreas']
	: string[];
export type BreakSizes<T extends BreakPointSatisfyObj, K extends keyof T> = BreakPtObj<
	T,
	K
>[K]['breakSizes'] extends number[]
	? BreakPtObj<T, K>[K]['breakSizes']
	: number[];

export type BreakAreaStates<T extends BreakPointSatisfyObj, K extends keyof T> = {
	[key in keyof BreakPtObj<T, K>]?: BreakPtObj<T, K>[key]['breakAreas'][number];
};

export type BreakAreaId<T extends BreakPointSatisfyObj, K extends keyof T> = keyof BreakPtObj<T, K>;
export type BreakAreaInfo<T extends BreakPointSatisfyObj, K extends keyof T> = BreakPtObj<T, K>[K];

export type BreakArea<T extends BreakPointSatisfyObj, K extends keyof T> = BreakAreaInfo<T, K>['breakAreas'][number];

export type TriggerFunc<T extends BreakPointSatisfyObj, K extends keyof T> = (
	current: BreakArea<T, K>,
	breakAreas: BreakAreaInfo<T, K>['breakAreas']
) => boolean;

export type BreakPointChangeEventData<T extends BreakPointSatisfyObj, K extends keyof T> = {
	// type: typeof UPDATE_BREAK_AREA;
	id: K;
	providerId: string;
	current: BreakArea<T, K>;
};
