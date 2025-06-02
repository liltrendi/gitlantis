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

export const useDirectoryWalker = (path = ROOT_DIRECTORY_KEY) => {
  const [walkerLoading, setWalkerLoading] = useState(true);
  const [walkerError, setWalkerError] = useState<null | TDirectoryErrorType>(
    null
  );
  const [walkerResponse, setWalkerResponse] = useState<TDirectoryContent[]>([]);
  const vscodeRef = useRef<ReturnType<typeof acquireVsCodeApi> | null>(null);

  useEffect(() => {
    vscodeRef.current = window.acquireVsCodeApi ? window.acquireVsCodeApi() : null;

    if (!vscodeRef.current) {
      setWalkerError({
        type: DIRECTORY_ERRORS.vscode_api_error,
        message: "Failed to load native vscode api",
      });
      setWalkerLoading(false);
      return;
    }

    const handleWalkResponse = ({
      data: { type, children, error },
    }: {
      data: THandlerMessage;
    }) => {
      switch (type) {
        case DIRECTORY_RESPONSE.children:
          setWalkerResponse(children);
          break;
        case DIRECTORY_RESPONSE.error:
          setWalkerError(error);
          break;
        default:
          break;
      }
      setWalkerLoading(false);
    };

    vscodeRef.current.postMessage({
      type: DIRECTORY_COMMANDS.read,
      path: path,
    });

    window.addEventListener("message", handleWalkResponse);

    return () => {
      window.removeEventListener("message", handleWalkResponse);
    };
  }, []);

  const openFolder = () => {
    if (!vscodeRef.current) return;
  
    vscodeRef.current.postMessage({
      type: DIRECTORY_COMMANDS.open_file_explorer,
    });
  };
  

  return { walkerLoading, walkerError, walkerResponse, openFolder };
};
