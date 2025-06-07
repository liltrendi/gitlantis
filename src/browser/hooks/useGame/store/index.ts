import { DIRECTORY_COMMANDS } from "@/extension/config";
import { DEFAULT_SETTINGS } from "@/extension/store";
import { create } from "zustand";

export const useGameStore = create<TGameStore>((set, get) => ({
  settings: DEFAULT_SETTINGS,
  extension: { isLoaded: false },

  initializeStore: (persistedSettings?: Partial<TDefaultSettings>) => {
    if (persistedSettings) {
      set({
        settings: { ...DEFAULT_SETTINGS, ...persistedSettings },
        extension: { isLoaded: true },
      });
    } else {
      set({ extension: { isLoaded: true } });
    }
  },

  persistState: () => {
    const vscodeApi = window?.vscodeApi;
    if (!vscodeApi) return;
    vscodeApi.postMessage({
      type: DIRECTORY_COMMANDS.persist_settings,
      data: get().settings,
    });
  },

  setMinimap: (minimap) => {
    set((state) => ({ settings: { ...state.settings, minimap } }));
    get().persistState();
  },

  setBreadcrumbs: (breadcrumbs) => {
    set((state) => ({ settings: { ...state.settings, breadcrumbs } }));
    get().persistState();
  },

  setCompass: (compass) => {
    set((state) => ({ settings: { ...state.settings, compass } }));
    get().persistState();
  },

  setNodesToShow: (nodesToShow) => {
    set((state) => ({ settings: { ...state.settings, nodesToShow } }));
    get().persistState();
  },

  setBoatSpeed: (boatSpeed: number) => {
    set((state) => ({ settings: { ...state.settings, boatSpeed } }));
    get().persistState();
  },

  setBoatAcceleration: (acceleration: number) => {
    set((state) => ({ settings: { ...state.settings, acceleration } }));
    get().persistState();
  },

  setBoatDeceleration: (deceleration: number) => {
    set((state) => ({ settings: { ...state.settings, deceleration } }));
    get().persistState();
  },

  setBoatTurnSpeed: (turnSpeed: number) => {
    set((state) => ({ settings: { ...state.settings, turnSpeed } }));
    get().persistState();
  },

  setBoatTurnDeceleration: (turnDeceleration: number) => {
    set((state) => ({ settings: { ...state.settings, turnDeceleration } }));
    get().persistState();
  },

  setCollisionRadius: (collisionRadius: number) => {
    set((state) => ({ settings: { ...state.settings, collisionRadius } }));
    get().persistState();
  },

  setCollisionPushStrength: (collisionPushStrength: number) => {
    set((state) => ({
      settings: { ...state.settings, collisionPushStrength },
    }));
    get().persistState();
  },

  setRockingAmplitude: (rockingAmplitude: number) => {
    set((state) => ({ settings: { ...state.settings, rockingAmplitude } }));
    get().persistState();
  },

  setRockingSpeed: (rockingSpeed: number) => {
    set((state) => ({ settings: { ...state.settings, rockingSpeed } }));
    get().persistState();
  },

  setBobbingAmplitude: (bobbingAmplitude: number) => {
    set((state) => ({ settings: { ...state.settings, bobbingAmplitude } }));
    get().persistState();
  },

  setBobbingSpeed: (bobbingSpeed: number) => {
    set((state) => ({ settings: { ...state.settings, bobbingSpeed } }));
    get().persistState();
  },

  setVolume: (volume: number) => {
    set((state) => ({ settings: { ...state.settings, volume } }));
    get().persistState();
  },
}));
