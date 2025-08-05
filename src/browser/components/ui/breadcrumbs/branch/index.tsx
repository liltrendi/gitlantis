import { useExtensionContext } from "@/browser/hooks/useExtension/context";
import { useGameContext } from "@/browser/hooks/useGame/context";
import { GIT_COMMANDS } from "@/extension/config";
import { useState } from "react";

export const BreadcrumbBranch = () => {
  const { vscodeApi } = useExtensionContext();
  const {
    git: {
      branches: { all: branches, current },
    },
  } = useGameContext();

  const [isPickerOpen, setPickerOpen] = useState(false);

  const toggleBranchPicker = () => setPickerOpen((prev) => !prev);

  const handleBranchSelection = (branch: string) => {
    setPickerOpen(false);
    if (!vscodeApi) return;
    vscodeApi.postMessage({
      type: GIT_COMMANDS.checkout_branch,
      branch,
    });
  };

  return (
    <div className="relative inline-block">
      <span
        className="text-md cursor-pointer select-none rounded-br-md rounded-tl-lg rounded-tr-lg border-b border-l border-l-4 border-r border-t border-[#2d302f] bg-[#f2bc07] px-2 py-[1px] text-black"
        onClick={toggleBranchPicker}
      >
        <span>
          <span className="pr-1 font-semibold">Branch:</span>
          <span className="">{current || "none found"}</span>
        </span>
      </span>

      {isPickerOpen && (
        <div className="absolute left-0 z-10 mt-1 max-h-64 min-w-max overflow-y-auto rounded-md border border-[#2d302f] bg-white shadow-lg">
          {branches.map((branch) => (
            <div
              key={branch}
              className="cursor-pointer whitespace-nowrap px-3 py-1 text-black hover:bg-gray-100"
              onClick={() => handleBranchSelection(branch)}
            >
              {branch}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
