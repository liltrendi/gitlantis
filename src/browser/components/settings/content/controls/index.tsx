import type { useGameSettings } from "@/browser/hooks/useGame/settings";
import type { ReactNode } from "react";

const Key = ({
  children,
  pad = false,
}: {
  children: ReactNode;
  pad?: boolean;
}) => {
  return (
    <div
      className={`w-8 h-8 rounded-md bg-[#1f1f1f] text-lg text-[#f2bc07] flex items-center justify-center shadow-inner border border-gray-600 ${
        pad ? "px-[40px] py-[20px]" : "px-[30px] py-[20px]"
      }
      ${children === " " ? "":"bg-[#1f2937]"}
      `}
    >
      {children}
    </div>
  )
};

const SettingsMovement = (gameProps: ReturnType<typeof useGameSettings>) => {
  return (
    <>
      <h3 className="text-xl text-gray-200 font-semibold mb-[15px]">
        {gameProps.activeTab.description[0]}
      </h3>
      <div className="inline-flex flex-col items-center justify-center gap-5 text-sm text-gray-300 font-mono">
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-1">
            <span className="text-md text-gray-400 !self-start mb-2">
              WASD (up, left, down, right)
            </span>
            <div className="grid grid-cols-3 gap-1 self-start">
              {[" ", "W", " ", "A", "S", "D"].map((key, index) => (
                <Key key={`key-${index}-${key}`}>{key}</Key>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-1 self-start">
            <span className="text-md text-gray-400 !self-start mb-2">
              Arrow Keys
            </span>
            <div className="grid grid-cols-3 gap-1 self-start">
              {[" ", "↑", " ", "←", "↓", "→"].map((key, index) => (
                <Key key={`key-${index}-${key}`}>{key}</Key>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const SettingsCombinations = (
  gameProps: ReturnType<typeof useGameSettings>
) => {
  return (
    <>
      <h3 className="text-xl text-gray-200 font-semibold mb-[15px] pt-[40px]">
        {gameProps.activeTab.description[1]}
      </h3>
      <div className="flex flex-col items-start gap-2 text-gray-400">
      <span className="text-md mb-2">Open files and folders</span>
        <div className="flex items-center gap-1">
          <Key pad>Shift</Key>
          <span className="text-xl px-2">+</span>
          <Key pad>Enter</Key>
        </div>
      </div>

      <div className="flex flex-col items-start gap-2 text-gray-400 mt-6">
      <span className="text-md mb-2">Go back one directory</span>
        <div className="flex items-center gap-1">
          <Key pad>Escape</Key>
        </div>
      </div>
    </>
  );
};

export const SettingsControls = (
  gameProps: ReturnType<typeof useGameSettings>
) => {
  return (
    <>
      <SettingsMovement {...gameProps} />
      <SettingsCombinations {...gameProps} />
    </>
  );
};
