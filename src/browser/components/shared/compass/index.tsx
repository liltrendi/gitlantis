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
  const { settings, showSplashScreen, isMinimapFullScreen } = useGameContext();

  if (settings.compass === "Hide") return null;

  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300  ${
        (showSplashScreen || isMinimapFullScreen) ? "opacity-0 pointer-events-none" : "opacity-100 delay-[1700ms]"
      }`}
    >
      <div className="relative w-80 h-2 bg-black/50 border border-gray-600 rounded overflow-hidden">
        <div
          className="absolute top-0 flex items-center h-full"
          style={{
            transform: `translateX(${-currentRotation}px)`,
            left: "50%",
            marginLeft: `-${compassWidth / 2}px`,
          }}
        >
          {compassStrip.map((item) => (
            <div
              key={item.key}
              className="flex flex-col items-center justify-center shrink-0 px-2"
              style={{ minWidth: `${markerWidth}px` }}
            >
              <div className="w-0.5 h-6 bg-gray-300 mb-1"></div>
              <span className="text-gray-300 text-xs font-mono">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-full bg-red-500 z-10">
          <div
            className="absolute -top-1 left-1/2 transform -translate-x-1/2"
            style={{
              width: 0,
              height: 0,
              borderLeft: "4px solid transparent",
              borderRight: "4px solid transparent",
              borderBottom: "6px solid red",
            }}
          ></div>
          <div
            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2"
            style={{
              width: 0,
              height: 0,
              borderLeft: "4px solid transparent",
              borderRight: "4px solid transparent",
              borderTop: "6px solid red",
            }}
          ></div>
        </div>
      </div>

      <div className="text-center mt-1">
        <span className="text-white text-xs font-bold bg-gray-600 px-[4px] py-1 rounded-md">
          {degreesLabel}
        </span>
      </div>
    </div>
  );
};
