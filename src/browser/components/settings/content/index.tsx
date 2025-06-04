import type { useGameSettings } from "@/browser/hooks/useGame/settings";

export const SettingsContent = (gameProps: ReturnType<typeof useGameSettings>) => {
  return (
    <div className="w-2/3 p-6 overflow-y-auto">
      {(() => {
        switch (gameProps.activeTab.label) {
          case "Display":
            return (
              <>
                <h3 className="text-xl font-semibold mb-[20px]">
                  {gameProps.activeTab.description}
                </h3>
                <label className="block mb-[20px]">
                  <span className="text-md">Minimap</span>
                  <select
                    className="w-full bg-gray-800 border border-gray-600 px-2 py-2 rounded mt-3"
                    onChange={(e) =>
                      gameProps.setShowMinimap(e.target.value === "Show")
                    }
                    value={gameProps.settings.showMinimap ? "Show" : "Hide"}
                  >
                    <option>Hide</option>
                    <option>Show</option>
                  </select>
                </label>
                <label className="block mb-[20px]">
                  <span className="text-md">Compass</span>
                  <select
                    className="w-full bg-gray-800 border border-gray-600 px-2 py-2 rounded mt-3"
                    onChange={(e) =>
                      gameProps.setShowCompass(e.target.value === "Show")
                    }
                    value={gameProps.settings.showCompass ? "Show" : "Hide"}
                  >
                    <option>Hide</option>
                    <option>Show</option>
                  </select>
                </label>
                <label className="block mb-[20px]">
                  <span className="text-md">Breadcrumbs</span>
                  <select
                    className="w-full bg-gray-800 border border-gray-600 px-2 py-2 rounded mt-3"
                    onChange={(e) =>
                      gameProps.setShowBreadcrumbs(e.target.value === "Show")
                    }
                    value={gameProps.settings.showBreadcrumbs ? "Show" : "Hide"}
                  >
                    <option>Hide</option>
                    <option>Show</option>
                  </select>
                </label>
              </>
            );
          case "Mechanics":
            const minGameSpeed = 1;
            const maxGameSpeed = 10;
            const sliderValue =
              ((gameProps.settings.boatSpeed - minGameSpeed) /
                (maxGameSpeed - minGameSpeed)) *
              100;
            return (
              <>
                <h3 className="text-xl font-semibold mb-[20px]">
                  {gameProps.activeTab.description}
                </h3>
                <label className="block mb-[20px]">
                  <span className="flex flex-row justify-between">
                    <span className="text-md">Boat speed</span>
                    <span className="text-md">{Math.ceil(sliderValue)}%</span>
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    className="w-full mt-3"
                    value={sliderValue}
                    onChange={(e) => {
                      gameProps.setBoatSpeed(
                        Number(
                          (
                            minGameSpeed +
                            (Number(e.target.value) / 100) *
                              (maxGameSpeed - minGameSpeed)
                          ).toFixed(2)
                        )
                      );
                    }}
                  />
                </label>
              </>
            );
          default:
            return null;
        }
      })()}
    </div>
  );
};
