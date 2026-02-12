import type { useGameSettings } from "@/hooks/useGame/settings";
import { SettingsGeneral } from "@/packages/components/settings/content/general";
import { SettingsBehavior } from "@/packages/components/settings/content/behavior";
import { SettingsControls } from "@/packages/components/settings/content/controls";
import { SettingsAbout } from "@/packages/components/settings/content/about";
import { SettingsRestoreDefaults } from "@/packages/components/settings/content/restore";

export const SettingsContent = (
  gameProps: ReturnType<typeof useGameSettings>
) => {
  return (
    <div className="w-4/5 overflow-y-auto overflow-x-hidden p-6">
      {(() => {
        const label = gameProps.activeTab.label;
        switch (label) {
          case "About":
            return <SettingsAbout {...gameProps} />;
          case "General":
            return <SettingsGeneral {...gameProps} />;
          case "Behavior":
            return <SettingsBehavior {...gameProps} />;
          case "Keybindings":
            return <SettingsControls {...gameProps} />;
          case "Danger zone":
            return <SettingsRestoreDefaults {...gameProps} />;
          default:
            return null;
        }
      })()}
    </div>
  );
};
