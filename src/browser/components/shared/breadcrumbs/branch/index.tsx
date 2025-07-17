import { useBranchSelection } from "@/browser/hooks/useGit/useBranchSelection";

export const BreadcrumbBranch = () => {
  const {
    allBranches,
    currentBranch,
    isPickerOpen,
    toggleBranchPicker,
    handleBranchSelection,
  } = useBranchSelection();

  return (
    <div className="inline-block">
      <span
        className={
          "text-md cursor-pointer rounded-br-md rounded-tl-lg rounded-tr-lg border-b border-l border-l-4 border-r border-t border-[#2d302f] bg-[#f2bc07] px-2 py-[1px] text-black"
        }
        onClick={toggleBranchPicker}
      >
        <span>
          <span className="pr-1 font-semibold">Branch:</span>
          {currentBranch}
        </span>
      </span>

      {isPickerOpen ? (
        <div className="absolute left-0 z-10 mt-1 w-full rounded-md border border-[#2d302f] bg-white shadow-lg">
          {allBranches.map((branch) => (
            <div
              key={branch}
              className="cursor-pointer px-3 py-1 text-black hover:bg-gray-100"
              onClick={() => handleBranchSelection(branch)}
            >
              {branch}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
