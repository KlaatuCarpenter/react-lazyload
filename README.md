# react-lazyload
Lazy load your Components or anything matters the performance with simple hook and browser API.  

## Why
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
