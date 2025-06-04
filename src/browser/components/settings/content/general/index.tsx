import type { useGameSettings } from "@/browser/hooks/useGame/settings";
import { ChevronDown } from "lucide-react";
import type { ChangeEventHandler } from "react";

const SharedSelect = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: TMinimap | TCompass | TBreadcrumbs | TNodesToShow;
  options: string[];
  onChange: ChangeEventHandler<HTMLSelectElement>;
}) => {
  return (
    <>
      <label className="block mb-[20px]">
        <span className="text-md text-gray-400">{label}</span>
        <div className="relative mt-3">
          <select
            className="w-full bg-gray-800 text-sm border border-gray-600 px-2 py-2 rounded appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={onChange}
            value={value}
          >
            {options.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-[8px] top-1/2 transform -translate-y-1/2 pointer-events-none w-6 h-6 flex items-center justify-center rounded bg-[#f2bc07]">
            <ChevronDown size={18} color="#222" />
          </div>
        </div>
      </label>
    </>
  );
};

export const SettingsGeneral = (
  gameProps: ReturnType<typeof useGameSettings>
) => {
  return (
    <>
      <h3 className="text-xl text-gray-200 font-semibold mb-[12px]">
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

      <h3 className="text-xl text-gray-200 font-semibold mb-[12px] pt-[20px]">
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
