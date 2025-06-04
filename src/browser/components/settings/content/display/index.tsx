import type { useGameSettings } from "@/browser/hooks/useGame/settings";
import { ChevronDown } from "lucide-react";

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
        <div className="relative mt-3">
          <select
            className="w-full bg-gray-800 border border-gray-600 px-2 py-2 rounded appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setter(e.target.value === "Show")}
            value={show ? "Show" : "Hide"}
          >
            <option>Hide</option>
            <option>Show</option>
          </select>
          <div className="absolute inset-y-0 right-2 top-1/2 transform -translate-y-1/2 pointer-events-none w-6 h-6 flex items-center justify-center rounded bg-[#f2bc07]">
            <ChevronDown size={20} color="#222" />
          </div>
        </div>
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
