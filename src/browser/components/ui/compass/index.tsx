import { useBoatCompass } from "@/browser/hooks/useBoat/compass";
import { useGameContext } from "@/browser/hooks/useGame/context";

export const Compass = () => {
  const {
    compassStrip,
    compassWidth,
    currentRotation,
    degreesLabel,
    markerWidth,
  } = useBoatCompass();
  const { settings, showSplashScreen } = useGameContext();

  if (settings.compass === "Hide") return null;

  return (
    <div
      className={`fixed bottom-4 left-1/2 z-50 -translate-x-1/2 transform transition-opacity duration-300 ${showSplashScreen ? "pointer-events-none opacity-0" : "opacity-100 delay-[1700ms]"} block`}
    >
      {/* Direction label above on mobile, below on desktop */}
      <div className="mb-1 block text-center sm:hidden">
        <span className="rounded-md bg-gray-600 px-[4px] py-1 text-xs font-bold text-white">
          {degreesLabel}
        </span>
      </div>

      <div className="relative h-2 w-48 overflow-hidden rounded border border-gray-600 bg-black/50 sm:w-80">
        <div
          className="absolute top-0 flex h-full items-center"
          style={{
            transform: `translateX(${-currentRotation}px)`,
            left: "50%",
            marginLeft: `-${compassWidth / 2}px`,
          }}
        >
          {compassStrip.map((item) => (
            <div
              key={item.key}
              className="flex shrink-0 flex-col items-center justify-center px-2"
              style={{ minWidth: `${markerWidth}px` }}
            >
              <div className="mb-1 h-6 w-0.5 bg-gray-300"></div>
              <span className="font-mono text-xs text-gray-300">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <div className="absolute left-1/2 top-0 z-10 h-full w-2 -translate-x-1/2 transform bg-red-500">
          <div
            className="absolute -top-1 left-1/2 -translate-x-1/2 transform"
            style={{
              width: 0,
              height: 0,
              borderLeft: "4px solid transparent",
              borderRight: "4px solid transparent",
              borderBottom: "6px solid red",
            }}
          />
          <div
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 transform"
            style={{
              width: 0,
              height: 0,
              borderLeft: "4px solid transparent",
              borderRight: "4px solid transparent",
              borderTop: "6px solid red",
            }}
          />
        </div>
      </div>

      {/* Direction label below on desktop */}
      <div className="mt-1 hidden text-center sm:block">
        <span className="rounded-md bg-gray-600 px-[4px] py-1 text-xs font-bold text-white">
          {degreesLabel}
        </span>
      </div>
    </div>
  );
};
