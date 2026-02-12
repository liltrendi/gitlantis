import { useGameSettings } from "@/hooks/useGame/settings";
import { createPortal } from "react-dom";
import { SettingsContent } from "@/packages/components/settings/content";
import { SettingsTabs } from "@/packages/components/settings/tabs";
import { SettingsModal } from "@/packages/components/settings/modal";
import { SettingsCog } from "@/packages/components/settings/buttons";

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
