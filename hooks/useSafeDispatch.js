import useMount from "./useMount";

export default function useSafeDispatch(dispatch) {
  const isMounted = useMount();

  return useCallback((...args) => {
    return isMounted ? dispatch(...args) : void 0;
  }, [ dispatch ]);
}