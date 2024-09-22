# container-breakpoints-react

In the concept of responsive design, we usually use @media queries. _BUT!_ 
when the container's size is NOT changed as the screen size is changed, the responive design easily becomes _PAIN_!! Yeah. Now we have container queries, but Why don't we have javascript controlled container query? 

`container-breakpoints-react` acts like container query, but what is better than container query is, 

- actually control rendering based on the size of `container` - HTML structure become simpler!
- No CSS override is needed. Once you have already responsive flex/grid layout, just use this on top of that!
- it is easy to use! fully `typescript` support! (your breakpoint name will be auto-completed)

## Event driven update

- while `container-breakpoints-react` still use context, it does NOT trigger whole children updates which made us to use state manager like jotai or redux. 
- the context just share ref objects, and only custom event will trigger each hooks to read the saved data. This design allows multiple update from ResizeObserver without triggering rendering. - it is FAST!!

## Typescript auto-completion is the core of container-breakpoints-react

I know typescript makes everybody lazy. And I am one of you guys. I don't want to type too much, I don't want to find documentation, just give me auto-completion options!!

Yes.. I know. So I made it as easy as possible. Try it out. And let me know how it feels like!


## Concept 

Let's say we have a scroll area (the blue area in the picture). In the big screen, 
It will be on the right side splitting the width of the screen. There is also margin area(gray) which is not included as container's size.

![big-screen](https://github.com/wootra/container-break-points/blob/main/packages/container-break-points/big-screen.png?raw=true)

Now let's make screen size smaller. But with our responsive design, the blue area got even bigger since the left nav bar went up on the screen.

![small-screen](https://github.com/wootra/container-break-points/blob/main/packages/container-break-points/small-screen.png?raw=true)

If we are controlling the size of the component based on the window's size, your code will easily become difficult to read and manage.

## Architecture

![Architecture](https://github.com/wootra/container-break-points/blob/main/packages/container-break-points/architecture.png?raw=true)

container-breakpoints library thought about multiple break points that can have a lot more freedom.

So, it has "container" boundary that has "id" for the specific container. We will share each container's status across all your application.

Imagine Your component's position was on the bottom when the container is small, But it shows on top when the container is big!

## Size map

container-breakpoints thought the existing breakpoint system other than CSS is not efficient.

Let's say you have 3 breakpoints. For example, 320, 768, 1024.
Then technically your break points boundary will be 4, not 3.

![size map](https://github.com/wootra/container-break-points/blob/main/packages/container-break-points/size-map.png?raw=true)

In container-breakpoints, we need 4 symbols for 3 breakpoints. ex> xs, sm, md, lg.
It automatically maps from 0-319, 320-767, 768-1023, 1024-infinity.
In this way, we will have a single name for the each boundary.

## Use useBreakAreaInfo hook for the basic-easy usage.

To manage multiple areas, you will call a simple hook and it will provide you helper functions. [Demo Code](https://github.com/wootra/container-break-points/blob/main/packages/container-break-points/https://github.com/wootra/container-break-points/blob/main/demo/src/routes/SimpleExample/ProviderWrapper.tsx)

```
import { createContainerBreakPoint } from 'container-breakpoints-react';

const {
	useBreakAreaInfo,
} = createContainerBreakPoint({
	carrousel: {
		breakAreas: ['sm', 'md', 'lg'],
		breakSizes: [450, 700],
	},
} as const); // all data structure will be guided by typescript!

...
const {
    current, // returns your break area name. i.e. 'sm'|'md'|'lg'...
    data: breakPtInfo, // returns break point info that is assigned to the provider. only for the specific id.
    isBreakAt, // helper function that returns boolean for exact match
    isBreakBetween, // helper function that returns boolean for range match
    isBreakDown, // helper function that returns match or smaller area
    isBreakUp, // helper function that returns match or bigger area
} = useBreakAreaInfo(id);

```
You will see that it ONLY renders only when breakpoint is changed. container-breakpoints-react library uses CustomEvent internally, So context will not trigger expand amount of rendering. It is FAST!!

## Use multiple hooks for more fine grained control.

useBreakAreaInfo will allow you to control optional rendering based on the container's size change. It is fast enough, but if you want to control even more fine grained, you can choose one of these hooks instead of using embedded helper functions from useBreakAreaInfo hook.
(all of them returns `boolean` type)

| hook name | args | description |
| -------------- | --- | -- |
| useBreakAreaAt | id:string | is the breakArea exactly matching? |
| useBreakAreasBetween | id:string, from:string, to:string | is the breakArea in from-to boundary? (including from&to) |
| useBreakAreasUp | id:string, from:string | is the breakArea bigger or equal to from area? |
| useBreakAreasDown | id:string, from:string | is the breakArea smaller or equal to from area? |

As you see the argument, the hook need the id of the container. You can keep a constant file and reuse it to manage all the breakpoints at one spot. [Demo Code](https://github.com/wootra/container-break-points/blob/main/apps/demo/src/Test2BreakPointConfig.ts)
NOTE: important!! you need to put `as const` at the end of the object to get the right type inferrence.

```typescript
// config.ts
import { createContainerBreakPoint } from 'container-breakpoints-react';

const breakPt = createContainerBreakPoint({
	carrousel: {
		breakAreas: ['sm', 'md', 'lg'],
		breakSizes: [450, 750],
	},
} as const); // <===== IMPORTANT!! put `as const` at the end!!

export {
	breakPt
};
```

Now, you can use it without setting any types. And it will MAGICALLY find all the breakPoint values, and map all the hook, Provider, Container components with typescript types.
[Demo Code](https://github.com/wootra/container-break-points/blob/main/apps/demo/src/Test2.tsx)
![auto-completion](https://github.com/wootra/container-break-points/blob/main/apps/demo)/break-pt-conteinr-auto-complete.png?raw=true)
```typescript
import { breakPt } from './config';
const {
    BreakAreaProvider,
	BreakPointContainer,
	useBreakAreaAt,
	useBreakAreaBetween,
	useBreakAreaInfo,
	useBreakAreasDown,
	useBreakAreasUp,
} = breakPt;


function Test2() {
    // Provider will not need any variable, since it is automatically assigned.
    // id will be auto-completed.
	return (
		<BreakAreaProvider>
			<BreakPointContainer id='carrousel' className={styles.container}>
                <div className={styles.wrapper}>
                    <Carousel />
                </div>
		    </BreakPointContainer>
		</BreakAreaProvider>
	);
}

const Carousel = () => {
	const { isBreakUp } = useBreakAreaInfo('carrousel'); // 'carrousel will be auto-completed
    // below isBreakUp's argument will be auto-completed.
	return (
		<div className={styles.carousel}>
			<CarouselItem title={'Gone with wind'}>1</CarouselItem>
			{isBreakUp('md') && <CarouselItem title='Dance with Wolves'>2</CarouselItem>}
			{isBreakUp('lg') && <CarouselItem title='Day after Tomorrow'>3</CarouselItem>}
		</div>
	);
};

const CarouselItem = ({ children, title }: PropsWithChildren<{ title: string }>) => {
	return (
		<div className={styles.carouselItem}>
			<h2>{title}</h2>
			<p style={{ textAlign: 'center', fontSize: '5rem' }}>{children}</p>
		</div>
	);
};
```
![demo]([my_video.mov](https://github.com/wootra/container-break-points/blob/main/packages/container-break-points)/breakpoint-demo.mp4?raw=true)
<video width="320" height="240" controls>
  <source src="https://github.com/wootra/container-break-points/blob/main/packages/container-break-points)/breakpoint-demo.mp4?raw=true" type="video/mp4">
</video>

## Typescript support

container-breakpoints-react library is written in typescript. It also reflect your own config object like `containerBreakpoints` above.
Then `container-breakpoints-react` will auto-MAGICALLY know which arguments are possible.

```typescript
const { current, data: breakPtInfo, isBreakAt } = useBreakAreaInfo('container1');
```

Look at the above code. The type `BreakPointsOptions` is defined [here](https://github.com/wootra/container-break-points/blob/main/packages/container-break-points/https://github.com/wootra/container-break-points/blob/main/demo/src/routes/SimpleExample/consts.ts) and you will see `container1` auto-completed.
![auto-complete-in-hook](https://github.com/wootra/container-break-points/blob/main/packages/container-break-points/auto-complete-in-hook.png?raw=true)

You can also see auto-complete in the individual helper functions.

![auto-complete-in-helper](https://github.com/wootra/container-break-points/blob/main/packages/container-break-points/auto-complete-in-helper.png?raw=true)

## Multi provider support

You can make multiple providers with different breakPoint definitions.
`container-breakpoints-react` will manage individual provider's id automatically, so they will not conflict with each other.

This is useful when you have multiple different pages using client-side router.

## NOTE

This library is using CustomEvent internally. Also, it leans on memoizations such as useRef, useMemo, useCallback, and useState. 
