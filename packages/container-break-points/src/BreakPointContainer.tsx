import { PropsWithChildren, useContext, useEffect, useRef } from 'react';
import { getBreakAreaContext } from './BreakAreaProvider';
import { BreakPointSatisfyObj, BreakPtObj } from './types';
type Props<T extends BreakPointSatisfyObj, K extends keyof T> = {
	className?: string;
	id: K;
};
const BreakPointContainer = <T extends BreakPointSatisfyObj, K extends keyof T>({
	id,
	className,
	children,
}: PropsWithChildren<Props<T, K>>) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const { setBreakArea } = useContext(getBreakAreaContext<T, K>());
	useEffect(() => {
		const resizeObserver = new ResizeObserver(entries => {
			for (const entry of entries) {
				if (entry.contentBoxSize) {
					const contentBoxSize = entry.contentBoxSize[0];
					if (contentBoxSize) {
						setBreakArea(id, contentBoxSize.inlineSize);
					}
				}
			}
		});
		setBreakArea(id, containerRef.current!.clientWidth); // initializing
		resizeObserver.observe(containerRef.current!);
		return () => {
			resizeObserver.disconnect();
		};
	}, []);
	return (
		<div className={`${className} break-point-container-${id as string}`} ref={containerRef}>
			{children}
		</div>
	);
};

const getBreakPointContainer = <T extends BreakPointSatisfyObj, K extends keyof T>() => {
	return BreakPointContainer<T, K>;
};

export { getBreakPointContainer };
