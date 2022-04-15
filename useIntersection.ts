import { useEffect, useRef, useState } from "react";

type OnIntersection = (
  isIntersecting: boolean,
  ob: IntersectionObserver
) => boolean | void;

const DefaultOptions: IntersectionObserverInit = {
  root: null,
  threshold: 0,
};

// Return false here to disconnect ob.
const DefaultOnIntersection: OnIntersection = (isIntersecting, _ob) => {
  if (isIntersecting) return false;
};

/**
 * Lazy Loading components with Intersection Observer API
 * @param onIntersection default: disconnect observer.
 * @param options default: `{root: null, threshold: 0}`
 * @returns `[isIntersecting, ref]`
 *
 * @see https://dev.to/anxiny/custom-react-hook-useintersection-with-intersection-observer-4l4e
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
 */
export function useIntersection(
  onIntersection: OnIntersection = DefaultOnIntersection,
  options: IntersectionObserverInit = DefaultOptions
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elemRef = useRef<null | Element | undefined>(null);
  const setElem = (elem: any) => {
    elemRef.current = elem;
  };

  useEffect(() => {
    if (!elemRef.current) return;
    let isUnmounted = false;
    const ob = new IntersectionObserver(
      ([entry]) => {
        if (isUnmounted) return;
        const isElementIntersecting = entry.isIntersecting;
        if (onIntersection(isElementIntersecting, ob) === false) {
          ob.disconnect();
        }
        setIsIntersecting(isElementIntersecting);
      },
      { ...options }
    );
    ob.observe(elemRef.current);
    return () => {
      ob.disconnect();
      isUnmounted = true;
    };
  }, [options, onIntersection]);

  return [isIntersecting, setElem] as const;
}
