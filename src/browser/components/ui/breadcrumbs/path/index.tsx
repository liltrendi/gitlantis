import { useExtensionContext } from "@/browser/hooks/useExtension/context";
import { useGameContext } from "@/browser/hooks/useGame/context";
import { ROOT_DIRECTORY_KEY } from "@/extension/config";

export const BreadcrumbPath = () => {
  const { rootLabel, currentPath, setCurrentPath } = useExtensionContext();
  const { baseFolder } = useGameContext();

  if (!currentPath || currentPath.length === 0) return null;

  const containerClasses =
    "flex flex-wrap max-w-[50vw] break-words rounded-bl-lg rounded-br-lg rounded-tr-lg bg-[#222]/90 px-2 py-1 gap-y-1";

  const segmentButtonClasses =
    "max-w-[10rem] truncate text-white text-sm focus:outline-none";

  if (currentPath === ROOT_DIRECTORY_KEY) {
    if (rootLabel.length > 0) {
      return (
        <nav className={containerClasses}>
          <span className="flex items-center text-gray-300">
            <span className="mr-1">Exploring:</span>
            <span className="text-white">{rootLabel}</span>
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
    <nav className={containerClasses}>
      <span className="mr-1 text-gray-300">Exploring:</span>
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
            {index > 0 && <span className="mx-1 text-gray-500">{">"}</span>}
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                if (!isLastItem) setCurrentPath("/" + fullPath);
              }}
              className={`${segmentButtonClasses} ${isLastItem ? "" : "hover:text-[#f2bc07] hover:underline"}`}
              title={segment}
            >
              {segment}
            </button>
          </span>
        );
      })}
    </nav>
  );
};
