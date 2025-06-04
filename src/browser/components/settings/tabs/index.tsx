import type { useGameSettings } from "@/browser/hooks/useGame/settings";

export const SettingsTabs = (gameProps: ReturnType<typeof useGameSettings>) => {
  return (
    <div className="w-1/3 bg-[#151515] p-0 border-r border-gray-700 overflow-y-auto">
      {gameProps.tabs.map((tab) => (
        <button
          key={tab.label}
          onClick={() => gameProps.setActiveTab(tab)}
          className={`w-full text-left text-lg p-6 border-b border-gray-700 ${
            gameProps.activeTab === tab ? "bg-gray-800 font-semibold" : "hover:bg-gray-800"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
