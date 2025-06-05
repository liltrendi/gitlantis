import { HelpCircle } from "lucide-react";

export const Tooltip = ({ tooltip }: { tooltip?: string }) => {
  if (!tooltip || tooltip.length === 0) return null;

  return (
    <div className="relative group/tooltip">
      <HelpCircle
        size={16}
        className="text-gray-500 hover:text-gray-300 cursor-help transition-colors"
      />
      <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 border border-gray-700">
        {tooltip}
        <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900"></div>
      </div>
    </div>
  );
};
