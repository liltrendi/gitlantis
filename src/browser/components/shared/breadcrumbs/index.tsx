import { useExtensionContext } from "@/browser/hooks/useExtension/context";
import { useGameContext } from "@/browser/hooks/useGame/context";
import { useBranchSelection } from "@/browser/hooks/useGit/useBranchSelection";
import { ROOT_DIRECTORY_KEY } from "@/extension/config";
import { type FC } from "react";

const BranchSelector = () => {
  const {allBranches, currentBranch, handleBranchSelection, isPickerOpen, setPickerOpen} = useBranchSelection()

  return (
    <div className="inline-block">
      <span
        className={
          "bg-[#f2bc07] px-2 py-[1px] text-md text-black rounded-tl-lg rounded-tr-lg rounded-br-md border-t border-l border-r border-b border-[#2d302f] border-l-4 cursor-pointer"
        }
        onClick={() => {
          setPickerOpen((prev) => !prev);
        }}
      >
        <span><span className="pr-1 font-semibold">Branch:</span>{currentBranch}</span>
      </span>

      {isPickerOpen?(
        <div className="absolute left-0 mt-1 w-full bg-white border border-[#2d302f] rounded-md shadow-lg z-10">
          {allBranches.map((branch) => (
            <div
              key={branch}
              className="px-3 py-1 hover:bg-gray-100 cursor-pointer text-black"
              onClick={() => handleBranchSelection(branch)}
            >
              {branch}
            </div>
          ))}
        </div>
      ):null}
    </div>
  );
};

export const Breadcrumbs = () => {
  const { rootLabel, currentPath, setCurrentPath } = useExtensionContext();
  const {
    settings,
    showSplashScreen,
    isMinimapFullScreen,
    isBrowserEnvironment,
  } = useGameContext();

  if (settings.breadcrumbs === "Hide" || currentPath.length === 0) return null;

  const segments = currentPath.split("/")?.filter(Boolean);

  return (
    <div
      className={`text-md text-gray-500 flex flex-col items-start absolute top-3 left-3 z-50 rounded-t-lg transition-opacity duration-300  ${
        showSplashScreen
          ? "opacity-0 pointer-events-none"
          : "opacity-100 delay-[1700ms]"
      } ${isMinimapFullScreen ? "hidden" : "block"}`}
    >
      <BranchSelector />

      <nav
        className={`flex flex-wrap max-w-[50vw] break-words bg-[#2d302f] px-3 py-1 rounded-bl-lg rounded-br-lg rounded-tr-lg`}
      >
        {(() => {
          if (currentPath === ROOT_DIRECTORY_KEY) {
            if (rootLabel.length > 0) {
              return (
                <span key={ROOT_DIRECTORY_KEY} className="flex items-center">
                  Exploring: {rootLabel}
                </span>
              );
            }
            return null;
          }
          return (
            <>
              {segments.map((segment, index) => {
                const fullPath = segments.slice(0, index + 1).join("/");
                return (
                  <span
                    key={`route-${index}-${fullPath}`}
                    className="flex items-center"
                  >
                    {index > 0 && (
                      <span className="mx-1 text-gray-400">{">"}</span>
                    )}
                    <button
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => setCurrentPath(fullPath)}
                      className="text-md text-white hover:underline hover:text-[#f2bc07] focus:outline-none"
                    >
                      {segment}
                    </button>
                  </span>
                );
              })}
            </>
          );
        })()}
      </nav>
    </div>
  );
};
