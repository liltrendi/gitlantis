import { createContext } from "react";

export const GameContext = createContext<TGameConfig>({
  boatRef: null,
  floatingRef: null,
  oceanRef: null,
  nodeRef: null,
  worldOffsetRef: null,
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
  oceanAudioRef: { current: null },
  git: {
    branches: { all: [], current: null },
  },
});
