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
      <h3 className="mb-[15px] text-xl font-semibold text-gray-200">
        {gameProps.activeTab.description[0]}
      </h3>
      <div className="space-y-5 text-gray-400">
        <p className="text-[16px]">
          You are about to reset all previously saved settings for Gitlantis.
          This will restore the extension to its default configuration.
        </p>
        <p className="mt-4 text-red-400">This action cannot be undone.</p>

        <div className="flex gap-3">
          <button
            onClick={() => {
              gameProps.setIsOpen(false);
            }}
            className="inline-flex items-center rounded-lg border bg-[transparent] px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleRestore}
            className="inline-flex items-center rounded-lg border bg-[#2a0f0f] px-4 py-2 font-medium text-red-400 shadow transition-colors duration-200 hover:bg-red-900"
          >
            Restore Defaults
          </button>
        </div>

        {showMessage && (
          <p className="pt-4 font-semibold text-green-400">
            The default configuration has been restored.
          </p>
        )}
      </div>
    </>
  );
};
