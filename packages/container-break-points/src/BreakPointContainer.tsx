import { PropsWithChildren, useContext, useEffect, useRef } from 'react';
import { getBreakAreaContext } from './BreakAreaProvider';
import { BreakPointSatisfyObj, BreakPtObj } from './types';
type Props<T extends BreakPointSatisfyObj = BreakPointSatisfyObj, U extends BreakPtObj<T> = BreakPtObj<T>> = {
	className?: string;
	id: keyof U;
};
const BreakPointContainer = <T extends BreakPointSatisfyObj = BreakPointSatisfyObj>({
	id,
	className,
	children,
}: PropsWithChildren<Props<T>>) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const { setBreakArea } = useContext(getBreakAreaContext<T>());
	useEffect(() => {
		const resizeObserver = new ResizeObserver(entries => {
			for (const entry of entries) {
				if (entry.contentBoxSize) {
					const contentBoxSize = entry.contentBoxSize[0];
					setBreakArea(id, contentBoxSize.inlineSize);
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

export { BreakPointContainer };
