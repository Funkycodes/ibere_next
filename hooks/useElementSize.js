import { useState } from "react";
import useIsomorphicEffect from "./useIsomorphicEffect";

export default function useElementSize(elementRef) {
  const element = elementRef.current;

  const [ size, setSize ] = useState({
    width: 0,
    height: 0
  });

  useIsomorphicEffect(() => {
    setSize({
      ...({ width, height } = element.getBoundingClientRect())
    });

    const observer = new ResizeObserver(entries =>
      entries.forEach(entry => setSize({
        width: entry.borderBoxSize[ 0 ].inlineSize,
        height: entry.borderBoxSize[ 0 ].blockSize
      }))
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return size;
}