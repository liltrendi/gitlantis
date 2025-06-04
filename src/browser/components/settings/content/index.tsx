import type { useGameSettings } from "@/browser/hooks/useGame/settings";
import { SettingsDisplay } from "@/browser/components/settings/content/display";
import { SettingsMechanics } from "@/browser/components/settings/content/mechanics";

export const SettingsContent = (
  gameProps: ReturnType<typeof useGameSettings>
) => {
  return (
    <div className="w-2/3 p-6 overflow-y-auto">
      {(() => {
        const label = gameProps.activeTab.label;
        switch (label) {
          case "General":
            return <SettingsDisplay {...gameProps} />;
          case "Mechanics":
            return <SettingsMechanics {...gameProps} />;
          default:
            return null;
        }
      })()}
    </div>
  );
};
