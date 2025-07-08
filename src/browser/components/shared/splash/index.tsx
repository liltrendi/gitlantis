import { useEffect, useRef, useState } from "react";
import { useProgress } from "@react-three/drei";
import { FAVICON_PATH } from "@/browser/config";
import { useGameContext } from "@/browser/hooks/useGame/context";

const globalUris = (window as any).__GLOBAL_URIS__ || {
  favicon: FAVICON_PATH, 
};

const MIN_LOAD_TIME = 1000;

export const Splash = () => {
  const {
    showSplashScreen,
    setShowSplashScreen,
    isBrowserEnvironment,
    oceanAudioRef,
    settings,
  } = useGameContext();

  const { progress } = useProgress();
  const [hasStartedLoading, setHasStartedLoading] = useState(false);
  const [displayedProgress, setDisplayedProgress] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const playOceanAudio = () => {
    const waitForBufferAndContext = () => {
      const audio = oceanAudioRef.current;
      if (!audio?.buffer) {
        requestAnimationFrame(waitForBufferAndContext);
        return;
      }

      audio.setVolume(settings.volume);
      const context = audio.context;

      if (context.state === "suspended") {
        context.resume().then(() => audio.play());
      } else {
        audio.play();
      }
    };

    waitForBufferAndContext();
  };

  const revealWorld = () => {
    setHasStartedLoading(true);
    startTimeRef.current = performance.now();
  };

  useEffect(() => {
    if (!hasStartedLoading) return;

    const animate = () => {
      setDisplayedProgress((prev) => {
        const diff = progress - prev;
        const step = diff * 0.1;
        return prev + step;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current!);
  }, [hasStartedLoading, progress]);

  useEffect(() => {
    if (
      hasStartedLoading &&
      displayedProgress >= 99 &&
      progress >= 100 &&
      startTimeRef.current &&
      performance.now() - startTimeRef.current > MIN_LOAD_TIME
    ) {
      setTimeout(() => {
        playOceanAudio()
        setShowSplashScreen(false)
      }, 300);
    }
  }, [displayedProgress, progress, hasStartedLoading]);

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
          className="w-14 h-14 sm:w-20 sm:h-20 mb-6 object-contain"
        />

        <h1 className="text-6xl md:text-7xl font-extrabold text-[#eee] mb-10">
          Gitlantis
        </h1>

        {hasStartedLoading ? (
          <div className="w-64 h-3 bg-gray-800 rounded-full overflow-hidden mt-4">
            <div
              className="h-full bg-yellow-400 transition-all duration-200 ease-out"
              style={{ width: `${Math.min(displayedProgress, 100)}%` }}
            />
          </div>
        ) : (
          <>
            <button
              onClick={revealWorld}
              className="px-6 py-3 rounded-full bg-[#f2bc07] text-black font-semibold text-lg hover:scale-105 transition-transform"
            >
              {isBrowserEnvironment ? "Explore demo" : "Start expedition"}
            </button>

            {isBrowserEnvironment && (
              <>
                <div className="my-[30px] text-gray-500 text-sm font-semibold">OR</div>
                <div className="flex flex-col items-center space-y-2 gap-1">
                  <a
                    href="https://open-vsx.org/extension/brian-njogu/gitlantis"
                    target="_blank"
                    className="text-md text-[#eee] underline hover:text-yellow-300 transition-colors"
                  >
                    Download via Open VSX
                  </a>
                  <a
                    href="https://marketplace.visualstudio.com/items?itemName=brian-njogu.gitlantis"
                    target="_blank"
                    className="text-md text-[#eee] underline hover:text-yellow-300 transition-colors"
                  >
                    Download via Visual Studio Code Marketplace
                  </a>
                </div>
              </>
            )}
          </>
        )}
      </div>

      {!hasStartedLoading && (
        <p className="pb-12 text-center text-gray-400 max-w-md mx-auto select-none">
          <span className="block mb-4 text-lg font-semibold tracking-wide text-gray-500 drop-shadow-lg">
            Navigate your ship with:
          </span>

          <kbd className="inline-block mx-1 px-3 py-1 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-lg">
            W
          </kbd>
          <kbd className="inline-block mx-1 px-3 py-1 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-lg">
            A
          </kbd>
          <kbd className="inline-block mx-1 px-3 py-1 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-lg">
            S
          </kbd>
          <kbd className="inline-block mx-1 px-3 py-1 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-lg">
            D
          </kbd>

          <span className="mx-2 font-semibold">or</span>

          <kbd className="inline-block mx-1 px-3 py-1 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-lg">
            ↑
          </kbd>
          <kbd className="inline-block mx-1 px-3 py-1 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-lg">
            ←
          </kbd>
          <kbd className="inline-block mx-1 px-3 py-1 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-lg">
            ↓
          </kbd>
          <kbd className="inline-block mx-1 px-3 py-1 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-lg">
            →
          </kbd>

          <span className="block pt-8 text-md text-gray-500">
            <a
              className="text-gray-500 underline"
              target="_blank"
              href="https://brayo.co"
            >
              brayo.co
            </a>
          </span>
        </p>
      )}
    </div>
  );
};
