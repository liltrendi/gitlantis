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
      className={`flex h-8 w-8 items-center justify-center rounded-md border border-gray-600 bg-[#1f1f1f] text-lg text-[#f2bc07] shadow-inner ${
        pad ? "px-[40px] py-[20px]" : "px-[30px] py-[20px]"
      } ${children === " " ? "" : "bg-[#1f2937]"} `}
    >
      {children}
    </div>
  );
};

const SettingsMovement = (gameProps: ReturnType<typeof useGameSettings>) => {
  return (
    <>
      <h3 className="mb-[15px] text-xl font-semibold text-gray-200">
        {gameProps.activeTab.description[0]}
      </h3>
      <div className="inline-flex flex-col items-center justify-center gap-5 font-mono text-sm text-gray-300">
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-1">
            <span className="text-md mb-2 !self-start text-gray-400">
              WASD (up, left, down, right)
            </span>
            <div className="grid grid-cols-3 gap-1 self-start">
              {[" ", "W", " ", "A", "S", "D"].map((key, index) => (
                <Key key={`key-${index}-${key}`}>{key}</Key>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-1 self-start">
            <span className="text-md mb-2 !self-start text-gray-400">
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
      <h3 className="mb-[15px] pt-[40px] text-xl font-semibold text-gray-200">
        {gameProps.activeTab.description[1]}
      </h3>
      <div className="flex flex-col items-start gap-2 text-gray-400">
        <span className="text-md mb-2">Open files and folders</span>
        <div className="flex items-center gap-1">
          <Key pad>Shift</Key>
          <span className="px-2 text-xl">+</span>
          <Key pad>Enter</Key>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-start gap-2 text-gray-400">
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
