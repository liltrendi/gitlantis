import { useExtensionContext } from "@/browser/hooks/useExtension/context";
import { useGameContext } from "@/browser/hooks/useGame/context";
import { ROOT_DIRECTORY_KEY } from "@/extension/config";

export const BreadcrumbPath = () => {
  const { rootLabel, currentPath, setCurrentPath } = useExtensionContext();
  const { baseFolder } = useGameContext();

  if (currentPath.length === 0) return null;

  if (currentPath === ROOT_DIRECTORY_KEY) {
    if (rootLabel.length > 0) {
      return (
        <nav className="flex max-w-[50vw] flex-wrap break-words rounded-bl-lg rounded-br-lg rounded-tr-lg bg-[#2d302f] px-3 py-1">
          <span key={ROOT_DIRECTORY_KEY} className="flex items-center">
            <span>Exploring:</span>
            <span className="cursor-pointer pl-1 text-white hover:text-[#f2bc07] hover:underline">
              {rootLabel}
            </span>
          </span>
        </nav>
      );
    }
    return null;
  }

  const segments = currentPath.split("/").filter(Boolean);
  const baseFolderSegments = baseFolder.split("/").filter(Boolean);

  const baseFolderIndex = segments.findIndex(
    (_, i) =>
      segments.slice(0, i + 1).join("/") === baseFolderSegments.join("/")
  );

  if (baseFolderIndex === -1) return null;

  const baseFolderChildren = segments.slice(baseFolderIndex);

  return (
    <nav className="flex max-w-[50vw] flex-wrap break-words rounded-bl-lg rounded-br-lg rounded-tr-lg bg-[#2d302f] px-3 py-1">
      <span className="flex items-center">
        <span>Exploring:</span>
        <span className="flex items-center pl-1">
          {baseFolderChildren.map((segment, index) => {
            const fullPath = segments
              .slice(0, baseFolderIndex + index + 1)
              .join("/");
            const isLastItem = index === baseFolderChildren.length - 1;

            return (
              <span
                key={`route-${index}-${fullPath}`}
                className="flex items-center"
              >
                {index > 0 && <span className="mx-1 text-gray-400">{">"}</span>}
                <button
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    if (isLastItem) return;
                    setCurrentPath("/" + fullPath);
                  }}
                  className="text-md text-white hover:text-[#f2bc07] hover:underline focus:outline-none"
                >
                  {segment}
                </button>
              </span>
            );
          })}
        </span>
      </span>
    </nav>
  );
};
