import { useGameContext } from "@/browser/hooks/useGame/context";
import { ArrowUpRight } from "lucide-react";

export const Donate = () => {
  const { showSplashScreen, isMinimapFullScreen } = useGameContext();

  return (
    <a
      href="https://buymeacoffee.com/liltrendi"
      target="_blank"
      rel="noopener noreferrer"
      className={`mb-2 inline-flex items-center gap-1.5 rounded-full border border-[#2d302f] bg-[#2d302f] px-4 py-2 text-sm font-medium text-[#f2bc07] shadow-lg transition-opacity duration-300 hover:bg-black sm:left-1/2 sm:top-3 sm:transform ${showSplashScreen ? "pointer-events-none opacity-0" : "opacity-100 delay-[1700ms]"} ${isMinimapFullScreen ? "hidden" : "block"}`}
      onClick={() => console.log(123)}
    >
      Support us
      <ArrowUpRight className="h-4 w-4" />
    </a>
  );
};
