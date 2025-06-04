import { useGameSettings } from "@/browser/hooks/useGame/settings";

const SharedSelect = ({
  label,
  show,
  setter,
}: {
  label: string;
  show: boolean;
  setter: (value: boolean) => void;
}) => {
  return (
    <>
      <label className="block mb-[20px]">
        <span className="text-md">{label}</span>
        <select
          className="w-full bg-gray-800 border border-gray-600 px-2 py-2 rounded mt-3"
          onChange={(e) => setter(e.target.value === "Show")}
          value={show ? "Show" : "Hide"}
        >
          <option>Hide</option>
          <option>Show</option>
        </select>
      </label>
    </>
  );
};

export const SettingsDisplay = (
  gameProps: ReturnType<typeof useGameSettings>
) => {
  return (
    <>
      <h3 className="text-xl font-semibold mb-[20px]">
        {gameProps.activeTab.description}
      </h3>
      <SharedSelect
        label="Minimap"
        show={gameProps.settings.showMinimap}
        setter={gameProps.setShowMinimap}
      />
      <SharedSelect
        label="Compass"
        show={gameProps.settings.showCompass}
        setter={gameProps.setShowCompass}
      />
      <SharedSelect
        label="Breadcrumbs"
        show={gameProps.settings.showBreadcrumbs}
        setter={gameProps.setShowBreadcrumbs}
      />
    </>
  );
};
