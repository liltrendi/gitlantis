import { useExtensionContext } from "@/browser/hooks/useExtension/context";
import { useGameContext } from "@/browser/hooks/useGame/context";
import { ROOT_DIRECTORY_KEY } from "@/extension/config";

export const Breadcrumbs = () => {
  const { rootLabel, currentPath, setCurrentPath } = useExtensionContext();
  const { settings, showSplashScreen, isMinimapFullScreen } = useGameContext();

  if (settings.breadcrumbs === "Hide" || currentPath.length === 0) return null;

  const segments = currentPath.split("/")?.filter(Boolean);

  return (
    <div
      className={`text-md absolute left-3 top-3 z-50 flex flex-col items-start rounded-t-lg text-gray-500 transition-opacity duration-300 ${
        showSplashScreen
          ? "pointer-events-none opacity-0"
          : "opacity-100 delay-[1700ms]"
      } ${isMinimapFullScreen ? "hidden" : "block"}`}
    >
      <span
        className={`text-md rounded-br-md rounded-tl-lg rounded-tr-lg border-b border-l border-l-4 border-r border-t border-[#2d302f] bg-[#f2bc07] px-2 py-[1px] text-black`}
      >
        File explorer
      </span>
      <nav
        className={`flex max-w-[50vw] flex-wrap break-words rounded-bl-lg rounded-br-lg rounded-tr-lg bg-[#2d302f] px-3 py-1`}
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
                      className="text-md text-white hover:text-[#f2bc07] hover:underline focus:outline-none"
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
