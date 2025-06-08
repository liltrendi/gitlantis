import type { useGameSettings } from "@/browser/hooks/useGame/settings";

export const SettingsTabs = (gameProps: ReturnType<typeof useGameSettings>) => {
  const allTabs = gameProps.tabs;
  const regularTabs = allTabs.slice(0, -1);
  const lastTab = allTabs[allTabs.length - 1];

  return (
    <div className="w-1/3 bg-[#151515] p-0 border-r border-gray-700 overflow-y-auto flex flex-col justify-between">
      <div>
        {regularTabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => gameProps.setActiveTab(tab)}
            className={`w-full text-left text-lg p-6 ${
              gameProps.activeTab === tab ? "bg-gray-800 font-semibold" : "hover:bg-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>
        <button
          key={lastTab.label}
          onClick={() => gameProps.setActiveTab(lastTab)}
          className={`w-full text-left text-lg p-6 text-red-400 font-semibold hover:bg-red-900 bg-[#2a0f0f]`}
        >
          {lastTab.label}
        </button>
      </div>
    </div>
  );
};
