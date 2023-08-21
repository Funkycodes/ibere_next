import { useEffect } from "react";

export default function useInterSectionObserver(elRef,
  options = {
    threshold: 0,
    root: null,
    rootMargin: "0%",
    freezeOnceVisible: false
  }) {
  const [ entry, setEntry ] = useState();
  const updateEntry = ([ entry ]) => setEntry(entry);

  useEffect(() => {
    const element = elRef?.current;
    const observer = new IntersectionObserver(updateEntry, options);
    observer.observe(element);

    return () => observer.disconnect();
  }, [ elRef.current ]);

  return entry;
}