import { create } from "zustand";

type TGameStore = {
  settings: {
    showMinimap: boolean;
    showBreadcrumbs: boolean;
    showCompass: boolean;
  };
  setShowMinimap: (showMinimap: boolean) => void;
  setShowBreadcrumbs: (showBreadcrumbs: boolean) => void;
  setShowCompass: (showCompass: boolean) => void;
};

export const useGameStore = create<TGameStore>((set) => ({
  settings: {
    showMinimap: false,
    showBreadcrumbs: false,
    showCompass: false,
  },
  setShowMinimap: (showMinimap: boolean) =>
    set((state) => ({ settings: { ...state.settings, showMinimap } })),
  setShowBreadcrumbs: (showBreadcrumbs: boolean) =>
    set((state) => ({ settings: { ...state.settings, showBreadcrumbs } })),
  setShowCompass: (showCompass: boolean) =>
    set((state) => ({ settings: { ...state.settings, showCompass } })),
}));
