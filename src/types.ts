export type BreakPtObj<T> = T extends Readonly<
	Record<
		infer Key,
		{
			breakSizes: number[];
			breakAreas: Readonly<(infer BreakAreas extends string)[]>;
		}
	>
>
	? Readonly<
			Record<
				Key,
				{
					breakSizes: number[];
					breakAreas: Readonly<BreakAreas[]>;
				}
			>
	  >
	: Readonly<
			Record<
				string,
				{
					breakSizes: number[];
					breakAreas: Readonly<string[]>;
				}
			>
	  >;
export type BreakAreaStates<T, U extends BreakPtObj<T> = BreakPtObj<T>> = {
	[key in keyof U]: U[key]['breakAreas'][number];
};

export type BreakAreaId<T> = keyof BreakPtObj<T>;

export type BreakAreaInfo<T> = BreakPtObj<T>[keyof BreakPtObj<T>]; // { breakSizes: number[]; breakAreas: string[] };

export type BreakArea<T> = BreakAreaInfo<T>['breakAreas'][number];
