import type { useGameSettings } from "@/browser/hooks/useGame/settings";
import { Settings, Activity, Keyboard, Info, Flame } from "lucide-react";

const tabIcons = {
  General: <Settings className="w-6 h-6" />,
  Behavior: <Activity className="w-6 h-6" />,
  Keybindings: <Keyboard className="w-6 h-6" />,
  About: <Info className="w-6 h-6" />,
  "Danger zone": <Flame className="w-6 h-6 text-red-500" />,
} as const;

export const SettingsTabs = (gameProps: ReturnType<typeof useGameSettings>) => {
  const allTabs = gameProps.tabs;
  const regularTabs = allTabs.slice(0, -1);
  const lastTab = allTabs[allTabs.length - 1];

  return (
    <div className="w-16 sm:w-48 bg-[#151515] border-r border-gray-700 overflow-y-auto flex flex-col py-4">
      {regularTabs.map((tab) => (
        <button
          key={tab.label}
          title={tab.label}
          onClick={() => gameProps.setActiveTab(tab)}
          className={`flex items-center gap-3 justify-center sm:justify-start px-4 py-5 text-sm sm:text-base transition-colors w-full ${
            gameProps.activeTab === tab
              ? "bg-gray-800 text-white font-semibold"
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
        className="mt-auto flex items-center gap-3 justify-center sm:justify-start px-4 py-5 text-sm sm:text-base w-full text-red-400 bg-[#2a0f0f] hover:bg-red-900 transition-colors"
      >
        {tabIcons[lastTab.label]}
        <span className="hidden sm:inline">{lastTab.label}</span>
      </button>
    </div>
  );
};
