import { getBreakAreaProvider } from './BreakAreaProvider';
import { BreakPointContainer as BreakPointContainerOrg } from './BreakPointContainer';
import { useBreakAreaInfo as useBreakAreaInfoOrg } from './useBreakAreaInfo';
import { useBreakAreaAt as useBreakAreaAtOrg } from './useBreakAreaAt';
import { useBreakAreaBetween as useBreakAreaBetweenOrg } from './useBreakAreaBetween';
import { useBreakAreasDown as useBreakAreasDownOrg } from './useBreakAreasDown';
import { useBreakAreasUp as useBreakAreasUpOrg } from './useBreakAreasUp';
import { BreakPointSatisfyObj, BreakPtObj } from './types';

function createContainerBreakPoint<T extends BreakPointSatisfyObj = BreakPointSatisfyObj>(breakPoints: T) {
	const BreakPointContainer = BreakPointContainerOrg<T>;
	const BreakAreaProvider = getBreakAreaProvider(breakPoints);
	const useBreakAreaInfo = useBreakAreaInfoOrg<T>;
	const useBreakAreaAt = useBreakAreaAtOrg<T>;
	const useBreakAreaBetween = useBreakAreaBetweenOrg<T>;
	const useBreakAreasDown = useBreakAreasDownOrg<T>;
	const useBreakAreasUp = useBreakAreasUpOrg<T>;

	return {
		BreakPointContainer,
		BreakAreaProvider,
		useBreakAreaInfo,
		useBreakAreaAt,
		useBreakAreaBetween,
		useBreakAreasDown,
		useBreakAreasUp,
		breakConfig: breakPoints as BreakPtObj<T>,
	};
}

export * from './types';
export { createContainerBreakPoint };
