import type { useGameSettings } from "@/browser/hooks/useGame/settings";
import { SettingsGeneral } from "@/browser/components/settings/content/general";
import { SettingsBehavior } from "@/browser/components/settings/content/behavior";
import { SettingsControls } from "@/browser/components/settings/content/controls";
import { SettingsAbout } from "@/browser/components/settings/content/about";
import { SettingsRestoreDefaults } from "@/browser/components/settings/content/restore";

export const SettingsContent = (
  gameProps: ReturnType<typeof useGameSettings>
) => {
  return (
    <div className="w-4/5 p-6 overflow-y-auto overflow-x-hidden">
      {(() => {
        const label = gameProps.activeTab.label;
        switch (label) {
          case "General":
            return <SettingsGeneral {...gameProps} />;
          case "Behavior":
            return <SettingsBehavior {...gameProps} />;
          case "Keybindings":
            return <SettingsControls {...gameProps} />;
          case "About":
            return <SettingsAbout {...gameProps} />;
          case "Danger zone":
            return <SettingsRestoreDefaults {...gameProps} />;
          default:
            return null;
        }
      })()}
    </div>
  );
};
