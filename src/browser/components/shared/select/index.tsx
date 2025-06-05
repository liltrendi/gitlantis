import { ChevronDown } from "lucide-react";
import type { ChangeEventHandler } from "react";
import { Tooltip } from "@/browser/components/shared/tooltip";

export const SharedSelect = ({
  label,
  value,
  options,
  tooltip,
  onChange,
}: {
  label: string;
  value: TMinimap | TCompass | TBreadcrumbs | TNodesToShow;
  options: string[];
  tooltip?: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
}) => {
  return (
    <>
      <label className="block mb-[20px] relative group">
        <div className="flex items-center gap-[5px]">
          <span className="text-md text-gray-400">{label}</span>
          <Tooltip tooltip={tooltip} />
        </div>
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
            <ChevronDown size={18} color="#000" />
          </div>
        </div>
      </label>
    </>
  );
};
