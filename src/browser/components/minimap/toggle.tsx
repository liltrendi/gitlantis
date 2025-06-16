import { useGameContext } from "@/browser/hooks/useGame/context";

export const MinimapToggle = () => {
  const {
    settings,
    showSplashScreen,
    isMinimapFullScreen,
    setMinimapFullscreen,
  } = useGameContext();

  const shouldShow = !showSplashScreen && settings.minimap === "Show";

  return (
    <button
      onClick={(e) => {
        e.currentTarget.blur();
        setMinimapFullscreen(!isMinimapFullScreen)
      }}
      title={isMinimapFullScreen ? "Minimize minimap" : "Fullscreen minimap"}
      className={`
        fixed z-[1001] w-11 h-11 
        bg-gray-800/90 border border-white/40 
        rounded-lg text-white cursor-pointer
        flex items-center justify-center
        hover:bg-gray-700/90 transition-colors
        transition-opacity duration-300 
        ${
          isMinimapFullScreen
            ? "right-[calc(3.9%+10px)] bottom-[calc(5.5%+10px)]"
            : "right-[15px] bottom-[15px]"
        } ${shouldShow ? "opacity-100 delay-[1700ms]" : "opacity-0 pointer-events-none"}
      `}
    >
      {isMinimapFullScreen ? (
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
        </svg>
      ) : (
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
        </svg>
      )}
    </button>
  );
};
