# container-breakpoints-react

![log](https://github.com/wootra/container-break-points/blob/main/packages/container-break-points/logo.png?raw=true)

In the concept of responsive design, we usually use @media queries. _BUT!_ 
when the container's size is NOT changed as the screen size is changed, the responive design easily becomes _PAIN_!! Yeah. Now we have container queries, but Why don't we have javascript controlled container query? 

## Key features

`container-breakpoints-react` acts like container query, but what is better than container query is, 

- actually control rendering based on the size of `container` - HTML structure become simpler!
- No CSS override is needed. Once you have already responsive flex/grid layout, just use this on top of that!
- it is easy to use! fully `typescript` support! (your breakpoint name will be auto-completed)
- server-side rendering is supported! (from 2.1.0). try out with javascript disabled option in chrome! [instruction](https://developer.chrome.com/docs/devtools/javascript/disable)

## Event driven update

- while `container-breakpoints-react` still use context, it does NOT trigger whole children updates. (this is sometimes the reason people start looking for state management system such as jotai or redux). 
- the context just share ref objects, and rendering in the child component is triggered by CustomEvent. This design allows multiple updates avoiding unnecessary rendering. - it is FAST!!

## Typescript auto-completion is the core of container-breakpoints-react

I know typescript makes everybody lazy. And I am one of you guys. I don't want to type too much, I don't want to find documentation, just give me auto-completion options!!

Yes.. I know. So I made it as easy as possible. Try it out. And let me know how it feels like!

## More info:
this mono repo provide [package](packages/container-break-points/README.md) and [Examples](apps/demo/README.md)