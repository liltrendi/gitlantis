import { useExtensionContext } from "@/browser/hooks/useExtension/context";
import { useGameContext } from "@/browser/hooks/useGame/context";
import { BreadcrumbBranch } from "@/browser/components/ui/breadcrumbs/branch";
import { BreadcrumbPath } from "@/browser/components/ui/breadcrumbs/path";

export const Breadcrumbs = () => {
  const { settings, showSplashScreen } = useGameContext();
  const { currentPath } = useExtensionContext();

  return (
    <div
      className={`text-md absolute left-3 top-3 z-50 z-[100] flex flex-col items-start rounded-t-lg text-gray-500 transition-opacity duration-300 ${
        showSplashScreen
          ? "pointer-events-none opacity-0"
          : "opacity-100 delay-[1700ms]"
      } block select-none`}
    >
      {settings.breadcrumbs === "Hide" || currentPath.length === 0 ? null : (
        <>
          <BreadcrumbBranch />
          <BreadcrumbPath />
        </>
      )}
    </div>
  );
};
