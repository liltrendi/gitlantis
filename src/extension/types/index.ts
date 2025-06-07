import type { Uri } from "vscode";
import { DIRECTORY_COMMANDS, DIRECTORY_ERRORS } from "../config";

type TMessageType = keyof typeof DIRECTORY_COMMANDS;

export type TDirectoryContent = {
  name: string;
  type: string;
  path: Uri | TDirectoryContentPath;
};

export type TDirectoryContentPath = { path: string; scheme: string };

export type TDirectoryErrorType = {
  type: (typeof DIRECTORY_ERRORS)[keyof typeof DIRECTORY_ERRORS];
  message: string;
};

export type THandlerMessage = {
  label: string;
  type: TMessageType;
  path: string;
  children: Array<TDirectoryContent>;
  error: TDirectoryErrorType;
  data?: TDefaultSettings;
};

declare global {
  function acquireVsCodeApi(): {
    postMessage: (message: any) => void;
    getState: () => any;
    setState: (state: any) => void;
  };

  interface Window {
    vscodeApi?: ReturnType<typeof acquireVsCodeApi>
  }

  type TAcquireVsCode = ReturnType<typeof acquireVsCodeApi>;

  type TShowHide = "Show" | "Hide";
  type TNodesToShow = "Folders and files" | "Folders only" | "Files only";

  type TDefaultSettings = {
    minimap: TShowHide;
    breadcrumbs: TShowHide;
    compass: TShowHide;
    nodesToShow: TNodesToShow;
    boatSpeed: number;
    acceleration: number;
    deceleration: number;
    turnSpeed: number;
    turnDeceleration: number;
    collisionRadius: number;
    collisionPushStrength: number;
    volume: number;
    rockingAmplitude: number,
    rockingSpeed: number,
    bobbingAmplitude: number,
    bobbingSpeed: number,
  };
}
