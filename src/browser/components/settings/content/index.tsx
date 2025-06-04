import type { useGameSettings } from "@/browser/hooks/useGame/settings";
import { SettingsGeneral } from "@/browser/components/settings/content/general";
import { SettingsMechanics } from "@/browser/components/settings/content/mechanics";
import { SettingsControls } from "@/browser/components/settings/content/controls";

export const SettingsContent = (
  gameProps: ReturnType<typeof useGameSettings>
) => {
  return (
    <div className="w-2/3 p-6 overflow-y-auto">
      {(() => {
        const label = gameProps.activeTab.label;
        switch (label) {
          case "General":
            return <SettingsGeneral {...gameProps} />;
          case "Mechanics":
            return <SettingsMechanics {...gameProps} />;
          case "Controls":
            return <SettingsControls {...gameProps} />;
          default:
            return null;
        }
      })()}
    </div>
  );
};
