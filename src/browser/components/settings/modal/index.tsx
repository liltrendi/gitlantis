import type { useGameSettings } from "@/browser/hooks/useGame/settings";
import type { ReactNode } from "react";
import { SettingsClose } from "@/browser/components/settings/buttons";

export const SettingsModal = (
  gameProps: ReturnType<typeof useGameSettings> & { children: ReactNode }
) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex flex-col items-center backdrop-blur-sm z-50 flex items-center justify-center">
      <div
        ref={gameProps.modalRef}
        className="bg-[#1e1e1e] text-white sm:w-[65vw] sm:h-[65vh] w-[95vw] h-[65vh] max-w-[650px] rounded-lg shadow-lg p-0 flex overflow-hidden border border-gray-600 relative"
      >
        <SettingsClose {...gameProps} />
        {gameProps.children}
      </div>
    </div>
  );
};
