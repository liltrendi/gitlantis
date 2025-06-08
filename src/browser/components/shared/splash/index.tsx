import { FAVICON_PATH } from "@/browser/config";
import { useGameContext } from "@/browser/hooks/useGame/context";

const globalUris = (window as any).__GLOBAL_URIS__ || {
  favicon: FAVICON_PATH,
};

export const Splash = () => {
  const { showSplashScreen, setShowSplashScreen } = useGameContext();

  return (
    <div
      className={`fixed inset-0 bg-[#0a0a0a] flex flex-col items-center z-50 transition-opacity duration-[2500ms] ${
        showSplashScreen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex flex-col items-center justify-center flex-grow">
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

      <p className="pb-12 text-center text-gray-400 max-w-md mx-auto select-none">
        <span className="block mb-2 text-lg font-semibold tracking-wide text-yellow-400 drop-shadow-lg">
          Navigate your ship with:
        </span>

        <kbd className="inline-block mx-1 px-3 py-1 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-lg transform hover:scale-110 transition-transform cursor-default select-none">
          W
        </kbd>
        <kbd className="inline-block mx-1 px-3 py-1 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-lg transform hover:scale-110 transition-transform cursor-default select-none">
          A
        </kbd>
        <kbd className="inline-block mx-1 px-3 py-1 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-lg transform hover:scale-110 transition-transform cursor-default select-none">
          S
        </kbd>
        <kbd className="inline-block mx-1 px-3 py-1 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-lg transform hover:scale-110 transition-transform cursor-default select-none">
          D
        </kbd>

        <span className="mx-2 font-semibold">or</span>

        <kbd className="inline-block mx-1 px-3 py-1 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-lg transform hover:scale-110 transition-transform cursor-default select-none">
          ↑
        </kbd>
        <kbd className="inline-block mx-1 px-3 py-1 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-lg transform hover:scale-110 transition-transform cursor-default select-none">
          ←
        </kbd>
        <kbd className="inline-block mx-1 px-3 py-1 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-lg transform hover:scale-110 transition-transform cursor-default select-none">
          ↓
        </kbd>
        <kbd className="inline-block mx-1 px-3 py-1 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-lg transform hover:scale-110 transition-transform cursor-default select-none">
          →
        </kbd>

        <span className="block pt-8 text-md text-gray-500">
          <a className="text-[#f2bc07] underline" target="_blank" href="https://brayo.co">brayo.co</a>
        </span>
      </p>
    </div>
  );
};
