import { useEffect } from "react";
import { useGameStore } from "@/browser/hooks/useGame/store";
import { DIRECTORY_COMMANDS } from "@/extension/config";

export const usePersistence = (
  vscodeApi: TAcquireVsCode | null | undefined
) => {
  const { initializeStore } = useGameStore();

  useEffect(() => {
    if (!vscodeApi) {
      initializeStore();
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
