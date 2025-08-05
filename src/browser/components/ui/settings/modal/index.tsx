import type { useGameSettings } from "@/browser/hooks/useGame/settings";
import type { ReactNode } from "react";
import { SettingsClose } from "@/browser/components/ui/settings/buttons";

export const SettingsModal = (
  gameProps: ReturnType<typeof useGameSettings> & { children: ReactNode }
) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
      <div
        ref={gameProps.modalRef}
        className="relative flex h-[65vh] w-[95vw] max-w-[650px] overflow-hidden rounded-lg border border-gray-600 bg-[#1e1e1e] p-0 text-white shadow-lg sm:h-[65vh] sm:w-[65vw]"
      >
        <SettingsClose {...gameProps} />
        {gameProps.children}
      </div>
    </div>
  );
};
