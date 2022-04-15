# react-lazyload
Lazy load your Components with simple hook and browser API.  

## Why
Component will only be mounted when it's visible in viewport, before that a placeholder will be rendered.

No additional DOM Nodes.  
No additional parameters.

## Usage
```js
const LazyLoad = (props) => {
    const [isIntersecting, ref] = useIntersection();
    return (
        <div ref={ref}>
            {isIntersecting ? props.children : null}
        </div>
    )
}
```
