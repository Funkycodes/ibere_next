import { useEffect, useLayoutEffect } from "react";

export default function useIsomorphicEffect(...args) {
  return typeof window !== "undefined"
    ? useLayoutEffect(...args)
    : useEffect(...args);
}
