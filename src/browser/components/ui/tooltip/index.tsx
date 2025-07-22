import { HelpCircle } from "lucide-react";

export const Tooltip = ({ tooltip }: { tooltip?: string }) => {
  if (!tooltip || tooltip.length === 0) return null;

  return (
    <div className="group/tooltip relative">
      <HelpCircle
        size={16}
        className="cursor-help text-gray-500 transition-colors hover:text-gray-300"
      />
      <div className="pointer-events-none absolute left-full top-1/2 z-10 ml-2 -translate-y-1/2 transform whitespace-nowrap rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover/tooltip:opacity-100">
        {tooltip}
        <div className="absolute right-full top-1/2 h-0 w-0 -translate-y-1/2 transform border-b-4 border-r-4 border-t-4 border-transparent border-r-gray-900"></div>
      </div>
    </div>
  );
};
