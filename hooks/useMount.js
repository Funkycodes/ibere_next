import { useRef } from "react";
import useIsomorphicEffect from "./useIsomorphicEffect";

export default function useMount() {
  const ref = useRef(false);
  useIsomorphicEffect(() => {
    ref.current = true;

    return () => {
      ref.current = false;
    };
  });
  return ref.current;
}