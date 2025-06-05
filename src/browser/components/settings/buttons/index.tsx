import { CogIcon, XIcon } from 'lucide-react'
import type { useGameSettings } from "@/browser/hooks/useGame/settings";

export const SettingsCog = (gameProps: ReturnType<typeof useGameSettings>) => {
  return (
    <button
      onClick={() => gameProps.setIsOpen(true)}
      className="absolute bottom-3 left-3 z-50 text-white text-lg color-[#fff] bg-[#222]/90 hover:bg-[#222]/80 px-3 py-[10px] rounded-lg"
    >
      <CogIcon color='#f2bc07' />
    </button>
  );
};

export const SettingsClose = (
  gameProps: ReturnType<typeof useGameSettings>
) => {
  return (
    <button
      onClick={() => gameProps.setIsOpen(false)}
      className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
    >
      <XIcon />
    </button>
  );
};
