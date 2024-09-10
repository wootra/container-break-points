import React, { PropsWithChildren, useContext, useEffect, useRef } from 'react';
import { BreakAreaContext } from './BreakAreaProvider';
type Props = {
	className?: string;
	id: string;
};
const BreakPointContainer = ({ id, className, children }: PropsWithChildren<Props>) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const { setBreakArea } = useContext(BreakAreaContext);
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
		<div className={`${className} break-point-container-${id}`} ref={containerRef}>
			{children}
		</div>
	);
};

export { BreakPointContainer };
