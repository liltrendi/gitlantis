import { useCallback, useEffect, useState } from "react";
import {
  DIRECTORY_COMMANDS,
  DIRECTORY_ERRORS,
  DIRECTORY_RESPONSE,
  ROOT_DIRECTORY_KEY,
} from "@/extension/config";
import type {
  TDirectoryContent,
  THandlerMessage,
  TDirectoryErrorType,
} from "@/extension/types";
import { SAMPLE_DATA } from "@/browser/config";
import { useExtensionContext } from "@/browser/hooks/useExtension/context";
import { useGameStore } from "@/browser/hooks/useGame/store";

export const useWalker = () => {
  const [walker, setWalker] = useState<{
    loading: boolean;
    error: null | TDirectoryErrorType;
    response: TDirectoryContent[];
  }>({
    loading: true,
    error: null,
    response: [],
  });

  const { vscodeApi, currentPath, setCurrentPath, setRootLabel } =
    useExtensionContext();
  const { settings } = useGameStore();

  const getFilteredNodes = useCallback(
    (nodes: TDirectoryContent[]) => {
      return nodes.filter((child) => {
        if (settings.nodesToShow === "Folders only")
          return child.type === "folder";
        if (settings.nodesToShow === "Files only") return child.type === "file";
        return child;
      });
    },
    [settings.nodesToShow]
  );

  const handleWalkResponse = useCallback(
    ({ data }: { data: THandlerMessage }) => {
      const { type, label, children, error } = data;
      switch (type) {
        case DIRECTORY_RESPONSE.data:
          if (currentPath === ROOT_DIRECTORY_KEY) {
            setRootLabel(label);
          }
          setWalker((prev) => ({
            ...prev,
            error: null,
            loading: false,
            response: getFilteredNodes(children),
          }));
          break;
        case DIRECTORY_RESPONSE.error:
          setWalker((prev) => ({ ...prev, loading: false, error }));
          break;
        default:
          break;
      }
    },
    [
      setRootLabel,
      setCurrentPath,
      getFilteredNodes,
      setWalker,
      settings.nodesToShow,
    ]
  );

  useEffect(() => {
    if (vscodeApi === undefined) return;

    if (!vscodeApi) {
      setWalker((prev) => ({
        ...prev,
        error: {
          type: DIRECTORY_ERRORS.vscode_api_error,
          message: "Failed to load native vscode api",
        },
        loading: false,
        response: getFilteredNodes(SAMPLE_DATA as TDirectoryContent[]),
      }));
      return;
    }

    vscodeApi.postMessage({
      type: DIRECTORY_COMMANDS.read_directory,
      path: currentPath,
    });

    window.addEventListener("message", handleWalkResponse);

    return () => {
      window.removeEventListener("message", handleWalkResponse);
    };
  }, [vscodeApi, currentPath, settings.nodesToShow]);

  const openExplorer = () => {
    if (!vscodeApi) return;

    vscodeApi.postMessage({
      type: DIRECTORY_COMMANDS.open_explorer,
    });
  };

  return { walker, settings, openExplorer };
};
