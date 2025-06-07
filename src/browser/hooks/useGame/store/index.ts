import { create } from "zustand";

export const useGameStore = create<TGameStore>((set) => ({
  settings: {
    minimap: "Show",
    breadcrumbs: "Show",
    compass: "Show",
    nodesToShow: "Folders and files",
    boatSpeed: 3.0,
    acceleration: 0.02,
    deceleration: 0.01,
    turnSpeed: 0.02,
    turnDeceleration: 0.05,
    collisionRadius: 100,
    collisionPushStrength: 5,
    volume: 0.3,
    splashScreen: "Show"
  },
  setMinimap: (minimap) =>
    set((state) => ({ settings: { ...state.settings, minimap } })),
  setBreadcrumbs: (breadcrumbs) =>
    set((state) => ({ settings: { ...state.settings, breadcrumbs } })),
  setCompass: (compass) =>
    set((state) => ({ settings: { ...state.settings, compass } })),
  setNodesToShow: (nodesToShow) =>
    set((state) => ({ settings: { ...state.settings, nodesToShow } })),
  setBoatSpeed: (boatSpeed: number) =>
    set((state) => ({ settings: { ...state.settings, boatSpeed } })),
  setBoatAcceleration: (acceleration: number) =>
    set((state) => ({ settings: { ...state.settings, acceleration } })),
  setBoatDeceleration: (deceleration: number) =>
    set((state) => ({ settings: { ...state.settings, deceleration } })),
  setBoatTurnSpeed: (turnSpeed: number) =>
    set((state) => ({ settings: { ...state.settings, turnSpeed } })),
  setBoatTurnDeceleration: (turnDeceleration: number) =>
    set((state) => ({ settings: { ...state.settings, turnDeceleration } })),
  setCollisionRadius: (collisionRadius: number) =>
    set((state) => ({ settings: { ...state.settings, collisionRadius } })),
  setCollisionPushStrength: (collisionPushStrength: number) =>
    set((state) => ({
      settings: { ...state.settings, collisionPushStrength },
    })),
  setVolume: (volume: number) =>
    set((state) => ({ settings: { ...state.settings, volume } })),
  setShowSplashScreen: (splashScreen) =>
    set((state) => ({ settings: { ...state.settings, splashScreen } })),
}));
