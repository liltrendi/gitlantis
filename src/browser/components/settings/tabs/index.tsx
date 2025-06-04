import type { useGameSettings } from "@/browser/hooks/useGame/settings";

export const SettingsTabs = (gameProps: ReturnType<typeof useGameSettings>) => {
  return (
    <div className="w-1/3 bg-[#151515] p-4 border-r border-gray-700 space-y-2">
      {gameProps.tabs.map((tab) => (
        <button
          key={tab.label}
          onClick={() => gameProps.setActiveTab(tab)}
          className={`w-full text-left px-3 py-2 rounded hover:bg-gray-700 ${
            gameProps.activeTab === tab ? "bg-gray-700 font-semibold" : ""
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
