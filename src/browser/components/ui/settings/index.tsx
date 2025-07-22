import { useGameSettings } from "@/browser/hooks/useGame/settings";
import { createPortal } from "react-dom";
import { SettingsContent } from "@/browser/components/ui/settings/content";
import { SettingsTabs } from "@/browser/components/ui/settings/tabs";
import { SettingsModal } from "@/browser/components/ui/settings/modal";
import { SettingsCog } from "@/browser/components/ui/settings/buttons";

export const GlobalSettings = () => {
  const gameProps = useGameSettings();

  return (
    <>
      <SettingsCog {...gameProps} />

      {gameProps.isOpen &&
        createPortal(
          <SettingsModal {...gameProps}>
            <SettingsTabs {...gameProps} />
            <SettingsContent {...gameProps} />
          </SettingsModal>,
          document.body
        )}
    </>
  );
};
