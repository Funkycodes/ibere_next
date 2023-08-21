import useIsomorphicEffect from "./useIsomorphicEffect";
import { useRef } from "react";

export default function useEvent(event, handler, element = undefined, options) {

  const handlerRef = useRef();

  useIsomorphicEffect(() => {
    handlerRef.current = handler;
  }, [ handler ]);

  useIsomorphicEffect(() => {
    const receiver = element ? element.current : window;
    receiver.addEventListener(event, handler, options);
    return () => {
      receiver.removeEventListener(event, handler, options);
    };
  }, [ event, element ]);
}