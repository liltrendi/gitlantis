import type { useGameSettings } from "@/browser/hooks/useGame/settings";
import type { ReactNode } from "react";
import { SettingsClose } from "@/browser/components/settings/buttons";

export const SettingsModal = (
  gameProps: ReturnType<typeof useGameSettings> & { children: ReactNode }
) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
      <div
        ref={gameProps.modalRef}
        className="bg-[#1e1e1e] text-white w-[60vw] h-[75vh] rounded-2xl shadow-lg p-0 flex overflow-hidden border border-gray-600 relative"
      >
        <SettingsClose {...gameProps} />
        {gameProps.children}
      </div>
    </div>
  );
};
