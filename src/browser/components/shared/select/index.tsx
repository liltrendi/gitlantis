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
  value: TShowHide | TNodesToShow;
  options: string[];
  tooltip?: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
}) => {
  return (
    <>
      <label className="group relative mb-[20px] block">
        <div className="flex items-center gap-[5px]">
          <span className="text-md text-gray-400">{label}</span>
          <Tooltip tooltip={tooltip} />
        </div>
        <div className="relative mt-3">
          <select
            className="w-full appearance-none rounded border border-gray-600 bg-gray-800 px-2 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={onChange}
            value={value}
          >
            {options.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-[8px] top-1/2 flex h-6 w-6 -translate-y-1/2 transform items-center justify-center rounded bg-[#f2bc07]">
            <ChevronDown size={18} color="#000" />
          </div>
        </div>
      </label>
    </>
  );
};
