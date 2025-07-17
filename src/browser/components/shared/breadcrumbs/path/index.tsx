import { useExtensionContext } from "@/browser/hooks/useExtension/context";
import { ROOT_DIRECTORY_KEY } from "@/extension/config";

export const BreadcrumbPath = () => {
  const { rootLabel, currentPath, setCurrentPath } = useExtensionContext();
  const segments = currentPath.split("/")?.filter(Boolean);

  if (currentPath.length === 0) return null;

  return (
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
  );
};
