import { useGameContext } from "@/browser/hooks/useGame/context";
import { ArrowUpRight } from "lucide-react";

export const Donate = () => {
  const { showSplashScreen, isMinimapFullScreen } = useGameContext();

  return (
    <a
      href="https://buymeacoffee.com/liltrendi"
      target="_blank"
      rel="noopener noreferrer"
      className={`
        fixed z-[100] transition-opacity duration-300
        top-20 left-3 sm:top-3
        sm:left-1/2 sm:transform sm:-translate-x-1/2
        inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium
        bg-[#2d302f] hover:bg-black text-[#f2bc07] border border-[#2d302f] shadow-lg

        ${showSplashScreen ? "opacity-0 pointer-events-none" : "opacity-100 delay-[1700ms]"}
        ${isMinimapFullScreen ? "hidden" : "block"}
      `}
    >
      Consider donating
      <ArrowUpRight className="w-4 h-4" />
    </a>
  );
};
