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
        setMinimapFullscreen(!isMinimapFullScreen);
      }}
      title={isMinimapFullScreen ? "Minimize minimap" : "Fullscreen minimap"}
      className={`fixed right-[15px] top-[15px] z-[1001] flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-white/40 bg-gray-800/90 text-white transition-colors transition-opacity duration-300 hover:bg-gray-700/90 ${shouldShow ? "opacity-100 delay-[1700ms]" : "pointer-events-none opacity-0"} `}
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
