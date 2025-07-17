import { SharedSelect } from "@/browser/components/shared/select";
import { SharedSlider } from "@/browser/components/shared/slider";
import type { useGameSettings } from "@/browser/hooks/useGame/settings";

export const SettingsGeneral = (
  gameProps: ReturnType<typeof useGameSettings>
) => {
  return (
    <>
      <h3 className="mb-[15px] text-xl font-semibold text-gray-200">
        {gameProps.activeTab.description[0]}
      </h3>
      <SharedSelect
        label="Explore"
        value={gameProps.settings.nodesToShow}
        options={["Folders and files", "Folders only", "Files only"]}
        onChange={(e) =>
          gameProps.setNodesToShow(e.target.value as TNodesToShow)
        }
        tooltip="File types to interact with"
      />

      <h3 className="mb-[15px] pt-[15px] text-xl font-semibold text-gray-200">
        {gameProps.activeTab.description[1]}
      </h3>
      <SharedSlider
        label="Volume"
        min={0.01}
        max={1}
        value={gameProps.settings.volume}
        setter={gameProps.setVolume}
        tooltip="How loud the waves are"
      />

      <h3 className="mb-[15px] pt-[15px] text-xl font-semibold text-gray-200">
        {gameProps.activeTab.description[2]}
      </h3>
      <SharedSelect
        label="Minimap"
        value={gameProps.settings.minimap}
        options={["Show", "Hide"]}
        onChange={(e) => gameProps.setMinimap(e.target.value as TShowHide)}
        tooltip="Toggle overhead view"
      />
      <SharedSelect
        label="Compass"
        value={gameProps.settings.compass}
        options={["Show", "Hide"]}
        onChange={(e) => gameProps.setCompass(e.target.value as TShowHide)}
        tooltip="Toggle compass visibility"
      />
      <SharedSelect
        label="Breadcrumbs"
        value={gameProps.settings.breadcrumbs}
        options={["Show", "Hide"]}
        onChange={(e) => gameProps.setBreadcrumbs(e.target.value as TShowHide)}
        tooltip="Toggle navigation visibility"
      />
    </>
  );
};
