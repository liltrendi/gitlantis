import { SharedSelect } from "@/browser/components/shared/select";
import type { useGameSettings } from "@/browser/hooks/useGame/settings";

export const SettingsGeneral = (
  gameProps: ReturnType<typeof useGameSettings>
) => {
  return (
    <>
      <h3 className="text-xl text-gray-200 font-semibold mb-[15px]">
        {gameProps.activeTab.description[0]}
      </h3>
      <SharedSelect
        label="Render"
        value={gameProps.settings.nodesToShow}
        options={["Folders and files", "Folders only", "Files only"]}
        onChange={(e) =>
          gameProps.setNodesToShow(e.target.value as TNodesToShow)
        }
      />

      <h3 className="text-xl text-gray-200 font-semibold mb-[15px] pt-[20px]">
        {gameProps.activeTab.description[1]}
      </h3>
      <SharedSelect
        label="Minimap"
        value={gameProps.settings.minimap}
        options={["Show", "Hide"]}
        onChange={(e) => gameProps.setMinimap(e.target.value as TMinimap)}
      />
      <SharedSelect
        label="Compass"
        value={gameProps.settings.compass}
        options={["Show", "Hide"]}
        onChange={(e) => gameProps.setCompass(e.target.value as TCompass)}
      />
      <SharedSelect
        label="Breadcrumbs"
        value={gameProps.settings.breadcrumbs}
        options={["Show", "Hide"]}
        onChange={(e) =>
          gameProps.setBreadcrumbs(e.target.value as TBreadcrumbs)
        }
      />
    </>
  );
};
