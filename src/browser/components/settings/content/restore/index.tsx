import { useState } from "react";
import type { useGameSettings } from "@/browser/hooks/useGame/settings";

export const SettingsRestoreDefaults = (
  gameProps: ReturnType<typeof useGameSettings>
) => {
  const [showMessage, setShowMessage] = useState(false);

  const handleRestore = () => {
    gameProps.restoreDefaults();
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 5000);
  };

  return (
    <>
      <h3 className="text-xl text-gray-200 font-semibold mb-[15px]">
        {gameProps.activeTab.description[0]}
      </h3>
      <div className="space-y-5 text-gray-400">
        <p className="text-[16px]">
          You are about to reset all previously saved settings for Gitlantis.
          This will restore the extension to its default configuration.
        </p>
        <p className="text-red-400 mt-4">This action cannot be undone.</p>

        <div className="flex gap-3">
          <button
            onClick={() => {
              gameProps.setIsOpen(false);
            }}
            className="inline-flex items-center px-4 py-2 bg-[transparent] border hover:bg-gray-600 text-white font-medium rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleRestore}
            className="inline-flex items-center px-4 py-2 text-red-400 border font-medium hover:bg-red-900 bg-[#2a0f0f] rounded-lg shadow transition-colors duration-200"
          >
            Restore Defaults
          </button>
        </div>

        {showMessage && (
          <p className="pt-4 text-green-400 font-semibold">
            The default configuration has been restored.
          </p>
        )}
      </div>
    </>
  );
};
