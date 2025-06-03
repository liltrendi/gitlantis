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

const SAMPLE_DATA = [
  {
    name: ".cargo",
    type: "folder",
  },
  {
    name: ".git",
    type: "folder",
  },
  {
    name: ".gitignore",
    type: "file",
  },
  {
    name: ".pipelines",
    type: "folder",
  },
  {
    name: ".vscode",
    type: "folder",
  },
  {
    name: "CODE_OF_CONDUCT.md",
    type: "file",
  },
  {
    name: "CONTRIBUTING.md",
    type: "file",
  },
  {
    name: "Cargo.lock",
    type: "file",
  },
  {
    name: "Cargo.toml",
    type: "file",
  },
  {
    name: "LICENSE",
    type: "file",
  },
  {
    name: "README.md",
    type: "file",
  },
  {
    name: "SECURITY.md",
    type: "file",
  },
  {
    name: "assets",
    type: "folder",
  },
  {
    name: "benches",
    type: "folder",
  },
  {
    name: "build.rs",
    type: "file",
  },
  {
    name: "rust-toolchain.toml",
    type: "file",
  },
  {
    name: "rustfmt.toml",
    type: "file",
  },
  {
    name: "src",
    type: "folder",
  },
  {
    name: "target",
    type: "folder",
  },
  {
    name: "tools",
    type: "folder",
  },
];

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
