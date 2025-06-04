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

export const useWalker = (path = ROOT_DIRECTORY_KEY) => {
  const [walker, setWalker] = useState<{
    loading: boolean;
    error: null | TDirectoryErrorType;
    response: TDirectoryContent[];
  }>({
    loading: true,
    error: null,
    response: [],
  });

  const { vscodeApi } = useExtensionContext();

  useEffect(() => {
    if (vscodeApi === undefined) {
      return;
    }

    if (!vscodeApi) {
      setWalker((prev) => ({
        ...prev,
        error: {
          type: DIRECTORY_ERRORS.vscode_api_error,
          message: "Failed to load native vscode api",
        },
        loading: false,
        response: SAMPLE_DATA as TDirectoryContent[],
      }));
      return;
    }

    const handleWalkResponse = ({
      data: { type, children, error },
    }: {
      data: THandlerMessage;
    }) => {
      switch (type) {
        case DIRECTORY_RESPONSE.children:
          setWalker((prev) => ({ ...prev, response: children }));
          break;
        case DIRECTORY_RESPONSE.error:
          setWalker((prev) => ({ ...prev, error }));
          break;
        default:
          break;
      }
      setWalker((prev) => ({ ...prev, loading: false }));
    };

    vscodeApi.postMessage({
      type: DIRECTORY_COMMANDS.read_directory,
      path: path,
    });

    window.addEventListener("message", handleWalkResponse);

    return () => {
      window.removeEventListener("message", handleWalkResponse);
    };
  }, [vscodeApi, path]);

  const openFolder = () => {
    if (!vscodeApi) return;

    vscodeApi.postMessage({
      type: DIRECTORY_COMMANDS.open_file_explorer,
    });
  };

  return { walker, openFolder };
};