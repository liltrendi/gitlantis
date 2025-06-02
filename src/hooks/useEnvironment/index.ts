import { useEffect, useRef } from "react";

export const useEnvironment = () => {
  const vscodeRef = useRef<TAcquireVsCode | null>(null);

  useEffect(() => {
    vscodeRef.current = window.acquireVsCodeApi
      ? window.acquireVsCodeApi()
      : null;
  }, []);

  return {
    vscodeRef
  };
};
