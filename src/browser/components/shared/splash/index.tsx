import { FAVICON_PATH } from "@/browser/config";
import { useGameContext } from "@/browser/hooks/useGame/context";

const globalUris = (window as any).__GLOBAL_URIS__ || {
  favicon: FAVICON_PATH,
}; 

export const Splash = () => {
  const { showSplashScreen, setShowSplashScreen } = useGameContext();

  return (
    <div
      className={`fixed inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center z-50 transition-opacity duration-[2500ms] ${
        showSplashScreen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <img
        src={globalUris.favicon}
        alt="Gitlantis Logo"
        className="w-14 h-14 mb-6 object-contain"
      />

      <h1 className="text-6xl md:text-7xl font-extrabold text-[#eee] mb-10">
        Gitlantis
      </h1>

      <button
        onClick={() => setShowSplashScreen(false)}
        className="px-6 py-3 rounded-full bg-[#f2bc07] text-black font-semibold text-lg hover:scale-105 transition-transform"
      >
        Start expedition
      </button>
    </div>
  );
};
