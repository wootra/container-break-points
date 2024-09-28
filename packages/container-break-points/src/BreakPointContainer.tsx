import { PropsWithChildren, useContext, useEffect, useRef, useState } from 'react';
import { getBreakAreaContext } from './BreakAreaProvider';
import { BreakPointSatisfyObj } from './types';
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
	const { setBreakArea, dataRef } = useContext(getBreakAreaContext<T, K>());
	const [init, setInit] = useState(!!dataRef.current[id]);
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
		if (!dataRef.current[id]) {
			setInit(true); // if init was given, do not re-render
		}
		setBreakArea(id, containerRef.current!.clientWidth); // initializing
		resizeObserver.observe(containerRef.current!);

		return () => {
			resizeObserver.disconnect();
		};
	}, []);
	return (
		<div className={`${className} break-point-container-${id as string}`} ref={containerRef}>
			{init && children}
		</div>
	);
};

const getBreakPointContainer = <T extends BreakPointSatisfyObj, K extends keyof T>() => {
	return BreakPointContainer<T, K>;
};

export { getBreakPointContainer };
