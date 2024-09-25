import { getBreakAreaProvider } from './BreakAreaProvider';
import { getBreakPointContainer } from './BreakPointContainer';
import { useBreakAreaInfo as useBreakAreaInfoOrg } from './useBreakAreaInfo';
import { useBreakAreaAt as useBreakAreaAtOrg } from './useBreakAreaAt';
import { useBreakAreaBetween as useBreakAreaBetweenOrg } from './useBreakAreaBetween';
import { useBreakAreasDown as useBreakAreasDownOrg } from './useBreakAreasDown';
import { useBreakAreasUp as useBreakAreasUpOrg } from './useBreakAreasUp';
import { BreakArea, BreakPointSatisfyObj, BreakPtObj } from './types';

function createContainerBreakPoint<const T extends BreakPointSatisfyObj>(breakPoints: T) {
	const BreakPointContainer = getBreakPointContainer<T, keyof T>();
	const BreakAreaProvider = getBreakAreaProvider<T>(breakPoints);
	const useBreakAreaInfo = <K extends keyof T>(id: K) => {
		return useBreakAreaInfoOrg<T, keyof T>(id);
	};
	const useBreakAreaAt = <K extends keyof T, AREA extends BreakArea<T, K> = BreakArea<T, K>>(
		id: K,
		breakArea: AREA
	) => {
		return useBreakAreaAtOrg<T, K>(id, breakArea);
	};
	const useBreakAreaBetween = <K extends keyof T, AREA extends BreakArea<T, K> = BreakArea<T, K>>(
		id: K,
		from: AREA,
		to: AREA
	) => {
		return useBreakAreaBetweenOrg<T, K>(id, from, to);
	};
	const useBreakAreasDown = <K extends keyof T, AREA extends BreakArea<T, K> = BreakArea<T, K>>(
		id: K,
		from: AREA
	) => {
		return useBreakAreasDownOrg<T, K>(id, from);
	};
	const useBreakAreasUp = <K extends keyof T, AREA extends BreakArea<T, K> = BreakArea<T, K>>(id: K, from: AREA) => {
		return useBreakAreasUpOrg<T, K>(id, from);
	};

	return {
		BreakPointContainer,
		BreakAreaProvider,
		useBreakAreaInfo,
		useBreakAreaAt,
		useBreakAreaBetween,
		useBreakAreasDown,
		useBreakAreasUp,
		breakConfig: breakPoints as BreakPtObj<T, keyof T>,
	};
}

export * from './types';
export { createContainerBreakPoint };
