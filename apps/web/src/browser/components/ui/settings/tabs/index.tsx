import type { useGameSettings } from "@/browser/hooks/useGame/settings";
import { Settings, Activity, Keyboard, Info, Flame } from "lucide-react";

const tabIcons = {
  About: <Info className="h-6 w-6" />,
  General: <Settings className="h-6 w-6" />,
  Behavior: <Activity className="h-6 w-6" />,
  Keybindings: <Keyboard className="h-6 w-6" />,
  "Danger zone": <Flame className="h-6 w-6 text-red-500" />,
} as const;

export const SettingsTabs = (gameProps: ReturnType<typeof useGameSettings>) => {
  const allTabs = gameProps.tabs;
  const regularTabs = allTabs.slice(0, -1);
  const lastTab = allTabs[allTabs.length - 1];

  return (
    <div className="flex w-16 flex-col overflow-y-auto border-r border-gray-700 bg-[#151515] py-4 sm:w-48">
      {regularTabs.map((tab) => (
        <button
          key={tab.label}
          title={tab.label}
          onClick={() => gameProps.setActiveTab(tab)}
          className={`flex w-full items-center justify-center gap-3 px-4 py-5 text-sm transition-colors sm:justify-start sm:text-base ${
            gameProps.activeTab === tab
              ? "bg-gray-800 font-semibold text-white"
              : "text-gray-400 hover:bg-gray-800"
          }`}
        >
          {tabIcons[tab.label]}
          <span className="hidden sm:inline">{tab.label}</span>
        </button>
      ))}

      <button
        key={lastTab.label}
        title={lastTab.label}
        onClick={() => gameProps.setActiveTab(lastTab)}
        className="mt-auto flex w-full items-center justify-center gap-3 bg-[#2a0f0f] px-4 py-5 text-sm text-red-400 transition-colors hover:bg-red-900 sm:justify-start sm:text-base"
      >
        {tabIcons[lastTab.label]}
        <span className="hidden sm:inline">{lastTab.label}</span>
      </button>
    </div>
  );
};
