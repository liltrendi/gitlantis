import { ROOT_DIRECTORY_KEY } from "@/extension/config";
import { createContext } from "react";

export const GameContext = createContext<TGameConfig>({
  boatRef: null,
  floatingRef: null,
  oceanRef: null,
  nodeRef: null,
  worldOffsetRef: null,
  baseFolder: ROOT_DIRECTORY_KEY,
  directories: [],
  isBrowserEnvironment: true,
  settings: {} as Pick<TGameStore, "settings">["settings"],
  showSplashScreen: true,
  setShowSplashScreen: () => {},
  isMinimapFullScreen: false,
  setMinimapFullscreen: () => {},
  directionInputRef: {
    current: { forward: false, backward: false, left: false, right: false },
  },
  gameAudio: {
    ocean: { current: null },
    horn: { current: null },
  },
  git: {
    branches: { all: [], current: null },
  },
  activeWorld: "marine",
  toggleActiveWorld: () => {},
});
