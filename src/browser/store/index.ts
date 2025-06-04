import { create } from "zustand";

export const useGameStore = create<TGameStore>((set) => ({
  settings: {
    showMinimap: false,
    showBreadcrumbs: false,
    showCompass: false,
    boatSpeed: 3.0,
    acceleration: 0.02,
    deceleration: 0.01,
    turnSpeed: 0.02,
    turnDeceleration: 0.05,
  },
  setShowMinimap: (showMinimap: boolean) =>
    set((state) => ({ settings: { ...state.settings, showMinimap } })),
  setShowBreadcrumbs: (showBreadcrumbs: boolean) =>
    set((state) => ({ settings: { ...state.settings, showBreadcrumbs } })),
  setShowCompass: (showCompass: boolean) =>
    set((state) => ({ settings: { ...state.settings, showCompass } })),
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
