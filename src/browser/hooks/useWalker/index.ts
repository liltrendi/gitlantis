import { useEffect, useState } from "react";
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
import { useGameStore } from "@/browser/store";

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

  const { vscodeApi, currentPath, setCurrentPath } = useExtensionContext();
  const { settings } = useGameStore();

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
        response: (SAMPLE_DATA as TDirectoryContent[]).filter(child => {
          if(settings.nodesToShow === "Folders and files") return child;
          if(settings.nodesToShow === "Folders only") return child.type === "folder";
          if(settings.nodesToShow === "Files only") return child.type === "file";
          return child;
        }),
      }));
      return;
    }

    vscodeApi.postMessage({
      type: DIRECTORY_COMMANDS.read_directory,
      path: currentPath,
    });

    const handleWalkResponse = ({ data }: { data: THandlerMessage }) => {
      const { type, label, children, error } = data;
      switch (type) {
        case DIRECTORY_RESPONSE.data:
          if (currentPath === ROOT_DIRECTORY_KEY) {
            setCurrentPath(`Project: ${label}`);
          }
          setWalker((prev) => ({ ...prev, response: children.filter(child => {
            if(settings.nodesToShow === "Folders and files") return child;
            if(settings.nodesToShow === "Folders only") return child.type === "folder";
            if(settings.nodesToShow === "Files only") return child.type === "file";
            return child;
          }) }));
          break;
        case DIRECTORY_RESPONSE.error:
          setWalker((prev) => ({ ...prev, error }));
          break;
        default:
          break;
      }
      setWalker((prev) => ({ ...prev, loading: false }));
    };

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

  return { walker, openExplorer, settings };
};
