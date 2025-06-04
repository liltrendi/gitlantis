import { create } from "zustand"; 

export const useGameStore = create<TGameStore>((set) => ({
  settings: {
    minimap: "Hide",
    breadcrumbs: "Hide",
    compass: "Hide",
    nodesToShow: "Folders and files",
    boatSpeed: 3.0,
    acceleration: 0.02,
    deceleration: 0.01,
    turnSpeed: 0.02,
    turnDeceleration: 0.05,
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
}));
