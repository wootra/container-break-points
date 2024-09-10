# container-breakpoints

In the concept of responsive design, we use @media queries. 
when the screen size is changed, the UI layout or contents can be changed.
But now we have @container queries which we can control each components or widgets more flexible.

We can use CSS to manage the breakpoints in the container level.
But If you want to manage its information in the javascript level, 
it becomes a little challenge to organize CSS/Components as a managable size.

We have ResizeObserver to detect the size of the container. 
And This library started from there.

## Concept 

Let's say we have a scroll area (the blue area in the picture). In the big screen, 
It will be on the right side splitting the width of the screen. There is also margin area(gray) which is not included as window size.

![big-screen](big-screen.png)

Now let's make screen size smaller. But with our responsive design, the blue area got even bigger since the left nav bar went up on the screen.

![small-screen](small-screen.png)

If we are using just width size and break points relative to the screen, your code will become difficult to read and manage.

## Architecture

![Architecture](architecture.png)

container-breakpoints library thought about multiple break points that can have a lot more freedom.

So, it has "container" boundary that has "id" for the specific container. We will share each container's status across all your application.

Imagine Your component's position was on the bottom when the container is small, But it shows on top when the container is big!

## Size map

container-breakpoints thought the existing breakpoint system other than CSS is not efficient.

Let's say you have 3 breakpoints. For example, 320, 768, 1024.
Then technically your break points boundary will be 4, not 3.

![size map](size-map.png)

In container-breakpoints, we need 4 symbols for 3 breakpoints. ex> xs, sm, md, lg.
It automatically maps from 0-319, 320-767, 768-1023, 1024-infinity.
In this way, we will have a single name for the each boundary.
For the multiple area, container-breakpoints will provide multiple utility hooks. (all of them returns boolean)

| hook name | args | description |
| -------------- | --- | -- |
| useBreakAreaAt | id:string, breakArea:string | is it at the breakArea? |
| useBreakAreasBetween | id:string, from:string, to:string | is the breakArea from ~ to? (including from & to) |
| useBreakAreasUp | id:string, from:string | is the breakArea bigger or equal to from area? |
| useBreakAreasDown | id:string, from:string | is the breakArea smaller or equal to from area? |

As you see the argument, the hook need the id of the container. You can keep a constant file and reuse it to manage all the breakpoints at one spot.

```typescript
export const containerBreakpoints = Object.freeze({
    main: {
        breakSizes: [320, 768, 1024],
        breakAreas: ['xs', 'sm', 'md', 'lg'],
    },
    card: {
        breakSizes: [150],
        breakAreas: ['small-card', 'big-card'],
    },
    banner: {
        breakSizes: [320, 768],
        breakAreas: ['small-banner', 'medium-banner', 'big-banner'],
    }
});
export type Container = keyof typeof containerBreakpoints;
export type ContainerBreakpoint = (typeof containerBreakpoints)[Container];
```
