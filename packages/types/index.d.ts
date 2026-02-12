export type TDirectoryContentPath = { path: string; scheme: string };

export type TDirectoryContent = {
  name: string;
  type: string;
  path: TDirectoryContentPath;
  isSymlink?: boolean;
};

export type TDirectoryErrorType = {
  type: string;
  message: string;
};

export type THandlerMessage = {
  label: string;
  type: string;
  path: string;
  branch?: string;
  children: Array<TDirectoryContent>;
  error: TDirectoryErrorType;
  data?: TDefaultSettings;
  baseFolder?: string;
  [key: string]: unknown;
};

declare global {
  function acquireVsCodeApi(): {
    postMessage: (message: unknown) => void;
    getState: () => unknown;
    setState: (state: unknown) => void;
  };

  interface Window {
    vscodeApi?: ReturnType<typeof acquireVsCodeApi>;
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
    rockingAmplitude: number;
    rockingSpeed: number;
    bobbingAmplitude: number;
    bobbingSpeed: number;
    boatColors: {
      walls: string;
      roof: string;
      hull: string;
      rails: string;
      body: string;
      floaters: string;
    };
  };

  type TGlobalUris = {
    player: string;
    ocean: string;
    boat: string;
    folder: string;
    file: string;
    waves: string;
    favicon: string;
    horn: string;
    noiseTexture: string;
    bladeDiffuse: string;
    bladeAlpha: string;
    meadow: string;
    footsteps: string;
  };
}

export {};
