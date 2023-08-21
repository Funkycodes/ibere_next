import { useState } from "react";
import useIsomorphicEffect from "./useIsomorphicEffect";
import useEvent from "./useEvent";

export default function useWindowSize() {
  const [ size, setSize ] = useState({
    height: 0,
    width: 0
  });
  const handleResize = () => {
    setSize({ height: window.innerHeight, width: window.innerHeight });
  };
  useEvent("resize", handleResize);

  useIsomorphicEffect(() => {
    // Define only once, not on every render
    handleResize();
  }, []);

  return size;
}