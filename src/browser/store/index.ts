import { create } from "zustand";

export const useGameStore = create<TGameStore>((set) => ({
  settings: {
    showMinimap: false,
    showBreadcrumbs: false,
    showCompass: false,
    boatSpeed: 3.0,
  },
  setShowMinimap: (showMinimap: boolean) =>
    set((state) => ({ settings: { ...state.settings, showMinimap } })),
  setShowBreadcrumbs: (showBreadcrumbs: boolean) =>
    set((state) => ({ settings: { ...state.settings, showBreadcrumbs } })),
  setShowCompass: (showCompass: boolean) =>
    set((state) => ({ settings: { ...state.settings, showCompass } })),
  setBoatSpeed: (boatSpeed: number) =>
    set((state) => ({ settings: { ...state.settings, boatSpeed } })),
}));
