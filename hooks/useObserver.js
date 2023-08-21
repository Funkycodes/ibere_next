import { useCallback, useEffect, useRef } from "react";


export default function useObserver(type, callback,
  entries = [],
  options = {
    threshold: 0,
    root: null,
    rootMargin: "0%",
    freezeOnceVisible: false
  }) {
  const observerRef = useRef();
  const addEntry = (entry) =>
    observerRef.current.observe(entry.current);
  const removeEntry = (entry) =>
    observerRef.current.unobserve(entry.current);

  const memoCallback = useCallback(callback, [ callback ]);
  useEffect(() => {
    let observer;
    switch (type) {
      case "resize":
        observer = new ResizeObserver(memoCallback);
        break;
      case "intersection":
        observer = new IntersectionObserver(memoCallback, options);
        break;
      default:
        throw new Error("Sorry, such an observer does not exist");
    }
    observerRef.current = observer;
    entries.length && entries.forEach(entry => observerRef.current.observe(entry.current));

    return () => observerRef.current.disconnect();
  }, [ memoCallback ]
  );

  return { addEntry, removeEntry };
}