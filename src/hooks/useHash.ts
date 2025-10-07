import type { Dispatch, SetStateAction } from "react";

import { useCallback, useEffect, useState } from "react";

function useHash<S extends string>(initialHash: S | undefined): [S, Dispatch<SetStateAction<S>>] {
  const [hash, setHash] = useState<S>(() => {
    const hash: S = window.location.hash.replace("#", "") as S;
    return !initialHash ? hash : hash === "" ? initialHash : hash;
  });
  const hashChangeHandler = useCallback(() => {
    const hash: S = window.location.hash.replace("#", "") as S;
    setHash(!initialHash ? hash : hash === "" ? initialHash : hash);
  }, [setHash, initialHash]);

  useEffect(() => {
    window.addEventListener("hashchange", hashChangeHandler);
    return () => {
      window.removeEventListener("hashchange", hashChangeHandler);
    };
  }, [hashChangeHandler]);

  const updateHash = useCallback(
    (newHash: S | ((previousState: S) => S)) => {
      const resolvedHash = typeof newHash === "function" ? newHash(hash) : newHash;
      if (resolvedHash !== hash) {
        window.location.hash = resolvedHash;
      }
    },
    [hash],
  );

  return [hash, updateHash];
}

export default useHash;
