import { useExtensionContext } from "@/browser/hooks/useExtension/context";
import { ROOT_DIRECTORY_KEY } from "@/extension/config";

export const Breadcrumb = () => {
  const { currentPath, setCurrentPath } = useExtensionContext();

  if (currentPath.length === 0 || currentPath === ROOT_DIRECTORY_KEY)
    return null;

  const segments = currentPath.split("/")?.filter(Boolean);

  return (
    <div className="text-md text-gray-500 flex flex-col items-start absolute top-4 left-4 z-50 rounded-t-lg">
      <span className="bg-[#f2bc07] px-2 py-[1px] text-md text-black rounded-tl-lg rounded-tr-lg border-t border-l border-r border-[#222]">
        File explorer
      </span>
      <nav className="flex bg-[#222] px-3 py-1 rounded-bl-lg rounded-br-lg rounded-tr-lg">
        {segments.map((segment, index) => {
          const fullPath = segments.slice(0, index + 1).join("/");

          return (
            <span key={fullPath} className="flex items-center">
              {index > 0 && <span className="mx-1 text-gray-400">{">"}</span>}
              <button
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setCurrentPath(fullPath);
                }}
                className="text-md hover:underline hover:text-[#f2bc07] focus:outline-none"
              >
                {segment}
              </button>
            </span>
          );
        })}
      </nav>
    </div>
  );
};
