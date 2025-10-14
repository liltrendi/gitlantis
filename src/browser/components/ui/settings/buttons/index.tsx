import { CogIcon, XIcon } from "lucide-react";
import type { useGameSettings } from "@/browser/hooks/useGame/settings";
import { useGameContext } from "@/browser/hooks/useGame/context";

export const SettingsCog = (gameProps: ReturnType<typeof useGameSettings>) => {
  const { showSplashScreen } = useGameContext();

  return (
    <button
      onClick={() => gameProps.setIsOpen(true)}
      className={`color-[#fff] absolute bottom-3 left-3 z-50 rounded-lg bg-[#222]/90 px-3 py-[10px] text-lg text-white transition-opacity duration-300 hover:bg-[#222]/80 ${
        showSplashScreen
          ? "pointer-events-none opacity-0"
          : "opacity-100 delay-[1700ms]"
      } block`}
    >
      <CogIcon color="#f2bc07" />
    </button>
  );
};

export const SettingsClose = (
  gameProps: ReturnType<typeof useGameSettings>
) => {
  return (
    <button
      onClick={() => gameProps.setIsOpen(false)}
      className="absolute right-4 top-4 z-10 text-white hover:text-gray-300"
    >
      <XIcon />
    </button>
  );
};
