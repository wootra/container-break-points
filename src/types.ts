export type BreakAreaStates<T extends string> = Record<
	T,
	{
		current: string;
		breakAreas: string[];
		breakPoints: number[];
		isInit: boolean;
	}
>;
