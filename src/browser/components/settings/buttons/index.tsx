import type { useGameSettings } from "@/browser/hooks/useGame/settings";

export const SettingsCog = (gameProps: ReturnType<typeof useGameSettings>) => {
  return (
    <button
      onClick={() => gameProps.setIsOpen(true)}
      className="absolute top-3 right-3 z-50 text-white text-lg color-[#fff] bg-black/80 hover:bg-black/70 px-3 py-2 rounded-lg"
    >
      ⚙️
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
      ✕
    </button>
  );
};
