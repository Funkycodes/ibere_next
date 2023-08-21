import { useCallback, useLayoutEffect, useState } from "react";

export default function useRect(ref) {
  const [ rect, setRect ] = useState(getRect(ref ? ref.current : null));

  const handleResize = useCallback(() => {
    if (!ref.current) return;

    setRect(getRect(ref.current));
  }, [ ref ]);

  useLayoutEffect(() => {
    const element = ref?.current;
    if (!element) {
      return;
    }

    handleResize();

    if (typeof ResizeObserver === 'function') {
      let resizeObserver = new ResizeObserver(() => handleResize());
      resizeObserver.observe(element);

      return () => {
        if (!resizeObserver) {
          return;
        }

        resizeObserver.disconnect();
        resizeObserver = null;
      };
    } else {
      // Browser support, remove freely
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [ ref.current ]);

  return rect;
}

function getRect(element) {
  if (!element) {
    return {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: 0,
      height: 0
    };
  }
  return element.getBoundingClientRect();
}