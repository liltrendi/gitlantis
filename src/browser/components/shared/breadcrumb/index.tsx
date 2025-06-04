import { useExtensionContext } from "@/browser/hooks/useExtension/context";
import { ROOT_DIRECTORY_KEY } from "@/extension/config";

export const Breadcrumb = () => {
  const { currentPath, setCurrentPath } = useExtensionContext();
  if (currentPath.length === 0 || currentPath === ROOT_DIRECTORY_KEY)
    return null;

  const segments = currentPath.split("/")?.filter(Boolean);

  return (
    <nav className="text-2xl text-gray-500 flex items-center gap-2 absolute top-4 left-4 z-50 bg-[#222] px-3 py-1 rounded">
      {segments.map((segment, index) => {
        const fullPath = segments.slice(0, index + 1).join("/");
        console.log("fullPath", fullPath);

        return (
          <span key={fullPath} className="flex items-center">
            {index > 0 && <span className="mx-1 text-gray-400">{">"}</span>}
            <button
              onClick={() => {
                setCurrentPath(fullPath);
              }}
              className="hover:underline hover:text-[#f2bc07]"
            >
              {segment}
            </button>
          </span>
        );
      })}
    </nav>
  );
};
