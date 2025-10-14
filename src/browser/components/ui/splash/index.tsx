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
    gameAudio,
    settings,
  } = useGameContext();

  const { progress } = useProgress();
  const [hasStartedLoading, setHasStartedLoading] = useState(false);
  const [displayedProgress, setDisplayedProgress] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const playOceanAudio = () => {
    const waitForBufferAndContext = () => {
      const audio = gameAudio.ocean.current;
      if (!audio?.buffer) {
        requestAnimationFrame(waitForBufferAndContext);
        return;
      }

      audio.setVolume(settings.volume);
      const context = audio.context;

      if (context.state === "suspended") {
        context.resume().then(() => {
          if (!audio.isPlaying) audio.play();
        });
      } else {
        if (!audio.isPlaying) audio.play();
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
        playOceanAudio();
        setShowSplashScreen(false);
      }, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayedProgress, progress, hasStartedLoading]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center bg-[#0a0a0a] transition-opacity duration-[2500ms] ${
        showSplashScreen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="flex flex-grow flex-col items-center justify-center">
        <img
          src={globalUris.favicon}
          alt="Gitlantis Logo"
          className="mb-6 h-14 w-14 object-contain sm:h-20 sm:w-20"
        />

        <h1 className="mb-10 text-6xl font-extrabold text-[#eee] md:text-7xl">
          Gitlantis
        </h1>

        {hasStartedLoading ? (
          <div className="mt-4 h-3 w-64 overflow-hidden rounded-full bg-gray-800">
            <div
              className="h-full bg-yellow-400 transition-all duration-200 ease-out"
              style={{ width: `${Math.min(displayedProgress, 100)}%` }}
            />
          </div>
        ) : (
          <>
            <button
              onClick={revealWorld}
              className="rounded-full bg-[#f2bc07] px-6 py-3 text-lg font-semibold text-black transition-transform hover:scale-105"
            >
              {isBrowserEnvironment ? "Explore demo" : "Start expedition"}
            </button>

            {isBrowserEnvironment && (
              <>
                <div className="my-[30px] text-sm font-semibold text-gray-500">
                  OR
                </div>
                <div className="flex flex-col items-center gap-1 space-y-2">
                  <a
                    href="https://open-vsx.org/extension/brian-njogu/gitlantis"
                    target="_blank"
                    className="text-md text-[#eee] underline transition-colors hover:text-yellow-300"
                  >
                    Download via Open VSX
                  </a>
                  <a
                    href="https://marketplace.visualstudio.com/items?itemName=brian-njogu.gitlantis"
                    target="_blank"
                    className="text-md text-[#eee] underline transition-colors hover:text-yellow-300"
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
        <p className="mx-auto max-w-md select-none pb-12 text-center text-gray-400">
          <span className="mb-4 block text-lg font-semibold tracking-wide text-gray-500 drop-shadow-lg">
            Navigate your ship with:
          </span>

          <kbd className="mx-1 inline-block rounded-lg bg-gradient-to-br from-gray-800 to-gray-700 px-3 py-1 shadow-lg">
            W
          </kbd>
          <kbd className="mx-1 inline-block rounded-lg bg-gradient-to-br from-gray-800 to-gray-700 px-3 py-1 shadow-lg">
            A
          </kbd>
          <kbd className="mx-1 inline-block rounded-lg bg-gradient-to-br from-gray-800 to-gray-700 px-3 py-1 shadow-lg">
            S
          </kbd>
          <kbd className="mx-1 inline-block rounded-lg bg-gradient-to-br from-gray-800 to-gray-700 px-3 py-1 shadow-lg">
            D
          </kbd>

          <span className="mx-2 font-semibold">or</span>

          <kbd className="mx-1 inline-block rounded-lg bg-gradient-to-br from-gray-800 to-gray-700 px-3 py-1 shadow-lg">
            ↑
          </kbd>
          <kbd className="mx-1 inline-block rounded-lg bg-gradient-to-br from-gray-800 to-gray-700 px-3 py-1 shadow-lg">
            ←
          </kbd>
          <kbd className="mx-1 inline-block rounded-lg bg-gradient-to-br from-gray-800 to-gray-700 px-3 py-1 shadow-lg">
            ↓
          </kbd>
          <kbd className="mx-1 inline-block rounded-lg bg-gradient-to-br from-gray-800 to-gray-700 px-3 py-1 shadow-lg">
            →
          </kbd>

          <span className="text-md block pt-8 text-gray-500">
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
