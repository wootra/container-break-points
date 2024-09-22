type Immutable<T> = {
	readonly [K in keyof T]: Immutable<T[K]>;
};

export type BreakPointSatisfyObj = Immutable<{ [key: string]: { breakAreas: string[]; breakSizes: number[] } }>;

export type BreakAreasType<T extends Immutable<{ breakAreas: string[]; breakSizes: number[] }>> = {
	readonly breakAreas: T['breakAreas'] extends readonly string[] ? T['breakAreas'] : readonly string[];
	readonly breakSizes: T['breakSizes'] extends readonly number[] ? T['breakSizes'] : readonly number[];
};

export type BreakPtObj<T extends BreakPointSatisfyObj> = {
	readonly [Key in keyof T]: BreakAreasType<
		T[Key] extends { breakAreas: readonly string[]; breakSizes: readonly number[] }
			? T[Key]
			: { readonly breakAreas: readonly string[]; readonly breakSizes: readonly number[] }
	>;
};

export type BreakAreas<
	T extends BreakPointSatisfyObj,
	U extends BreakPtObj<T>,
	K extends keyof U,
> = U[K]['breakAreas'] extends string[] ? U[K]['breakAreas'] : string[];
export type BreakSizes<
	T extends BreakPointSatisfyObj,
	U extends BreakPtObj<T>,
	K extends keyof U,
> = U[K]['breakSizes'] extends number[] ? U[K]['breakSizes'] : number[];

export type BreakAreaStates<T extends BreakPointSatisfyObj, U extends BreakPtObj<T>> = {
	[key in keyof U]: U[key]['breakAreas'][number];
};

export type BreakAreaId<T extends BreakPointSatisfyObj, U extends BreakPtObj<T> = BreakPtObj<T>> = keyof U;
export type BreakAreaInfo<T extends BreakPointSatisfyObj, U extends BreakPtObj<T>, K extends keyof U> = U[K];

export type BreakArea<T extends BreakPointSatisfyObj, U extends BreakPtObj<T>, K extends keyof U> = BreakAreaInfo<
	T,
	U,
	K
>['breakAreas'][number];

export type TriggerFunc<T extends BreakPointSatisfyObj, U extends BreakPtObj<T>, K extends keyof U> = (
	current: BreakArea<T, U, K>,
	breakAreas: BreakAreaInfo<T, U, K>['breakAreas']
) => boolean;

export type BreakPointChangeEventData<T extends BreakPointSatisfyObj, U extends BreakPtObj<T>, K extends keyof U> = {
	// type: typeof UPDATE_BREAK_AREA;
	id: K;
	providerId: string;
	current: BreakArea<T, U, K>;
};
