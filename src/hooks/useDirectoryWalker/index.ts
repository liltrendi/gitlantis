import { useEffect, useState, type RefObject } from "react";
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

export const useDirectoryWalker = ({
  path = ROOT_DIRECTORY_KEY,
  vscodeRef,
}: {
  path?: string;
  vscodeRef: RefObject<TAcquireVsCode | null>;
}) => {
  const [walkerLoading, setWalkerLoading] = useState(true);
  const [walkerError, setWalkerError] = useState<null | TDirectoryErrorType>(
    null
  );
  const [walkerResponse, setWalkerResponse] = useState<TDirectoryContent[]>(
    vscodeRef?.current ? [] : SAMPLE_DATA
  );

  useEffect(() => {
    if (!vscodeRef?.current) {
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
  }, [vscodeRef?.current]);

  const openFolder = () => {
    if (!vscodeRef?.current) return;

    vscodeRef.current.postMessage({
      type: DIRECTORY_COMMANDS.open_file_explorer,
    });
  };

  return { walkerLoading, walkerError, walkerResponse, openFolder };
};
