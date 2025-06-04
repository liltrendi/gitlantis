import type { Uri } from "vscode";
import { DIRECTORY_COMMANDS, DIRECTORY_ERRORS } from "../config";

type TMessageType = keyof typeof DIRECTORY_COMMANDS;

export type TDirectoryContent = {
  name: string;
  type: string;
  path: Uri | TDirectoryContentPath;
};

export type TDirectoryContentPath = {path: string, scheme: string}

export type TDirectoryErrorType = {
  type: typeof DIRECTORY_ERRORS[keyof typeof DIRECTORY_ERRORS],
  message: string
};

export type THandlerMessage = {
  type: TMessageType;
  path: string;
  children: Array<TDirectoryContent>;
  error: TDirectoryErrorType;
};

declare global {
  function acquireVsCodeApi(): {
    postMessage: (message: any) => void;
    getState: () => any;
    setState: (state: any) => void;
  };

  type TAcquireVsCode = ReturnType<typeof acquireVsCodeApi>
}