import { useEffect } from "react";
import { useGameStore } from "@/browser/hooks/useGame/store";
import { DIRECTORY_COMMANDS } from "@/extension/config";
import { PERSISTED_SETTINGS_KEY } from "@/extension/store";

export const usePersistence = (
  vscodeApi: TAcquireVsCode | null | undefined
) => {
  const { initializeStore } = useGameStore();

  useEffect(() => {
    if (!vscodeApi) {
      try {
        const stored = localStorage.getItem(PERSISTED_SETTINGS_KEY);
        const parsed = stored ? JSON.parse(stored) : undefined;
        initializeStore(parsed);
      } catch (_) {
        initializeStore();
      }
      return;
    }

    const messageListener = (event: MessageEvent) => {
      const message = event.data;
      if (message.type === DIRECTORY_COMMANDS.settings_loaded) {
        initializeStore(message.data);
      }
    };

    window.addEventListener("message", messageListener);

    vscodeApi.postMessage({
      type: DIRECTORY_COMMANDS.load_settings,
    });

    return () => {
      window.removeEventListener("message", messageListener);
    };
  }, [initializeStore, vscodeApi]);
};
