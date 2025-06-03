import { useEffect, useRef, useState } from "react";
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

  const vscodeApi = useRef<TAcquireVsCode | null>(null);

  useEffect(() => {
    vscodeApi.current = window.acquireVsCodeApi
      ? window.acquireVsCodeApi()
      : null;

    if (!vscodeApi?.current) {
      setWalker((prev) => ({
        ...prev,
        error: {
          type: DIRECTORY_ERRORS.vscode_api_error,
          message: "Failed to load native vscode api",
        },
        loading: false,
        response: SAMPLE_DATA,
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

    vscodeApi.current.postMessage({
      type: DIRECTORY_COMMANDS.read,
      path: path,
    });

    window.addEventListener("message", handleWalkResponse);

    return () => {
      window.removeEventListener("message", handleWalkResponse);
    };
  }, []);

  const openFolder = () => {
    if (!vscodeApi?.current) return;

    vscodeApi.current.postMessage({
      type: DIRECTORY_COMMANDS.open_file_explorer,
    });
  };

  return { walker, openFolder };
};
