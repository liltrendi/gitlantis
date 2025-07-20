import { useCallback, useEffect, useState } from "react";
import { GIT_COMMANDS } from "@/extension/config";
import type { THandlerMessage } from "@/extension/types";
import { useExtensionContext } from "@/browser/hooks/useExtension/context";

type TBranchesResponse = {
  all: string[];
  current: null | string;
};

export const useBranches = () => {
  const { vscodeApi } = useExtensionContext();
  const [branches, setBranches] = useState<TBranchesResponse>({
    all: [],
    current: null,
  });

  const handleBranchResponses = useCallback(
    ({ data }: { data: THandlerMessage & TBranchesResponse }) => {
      const { type, all, current } = data;
      switch (type) {
        case GIT_COMMANDS.list_branches:
          setBranches((prev) => ({
            ...prev,
            all,
            current,
          }));
          break;
        case GIT_COMMANDS.checkout_branch:
          if (branches.current !== current) {
            setBranches((prev) => ({ ...prev, current }));
          }
          break;
        default:
          break;
      }
    },
    []
  );

  useEffect(() => {
    if (!vscodeApi) return;

    vscodeApi.postMessage({
      type: GIT_COMMANDS.list_branches,
    });

    window.addEventListener("message", handleBranchResponses);

    return () => {
      window.removeEventListener("message", handleBranchResponses);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vscodeApi]);

  return branches;
};
