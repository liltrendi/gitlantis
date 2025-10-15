import { useGameContext } from "@/browser/hooks/useGame/context";
import { motion } from "framer-motion";

export const WorldToggle = () => {
  const { showSplashScreen, activeWorld, toggleActiveWorld } = useGameContext();
  const isMarine = activeWorld === "marine";

  return (
    <div
      className={`flex items-center justify-center ${
        showSplashScreen
          ? "pointer-events-none opacity-0"
          : "opacity-100 delay-[1700ms]"
      } block`}
    >
      <div className="!fixed relative right-[10px] top-[10px] z-[51] flex h-8 w-[120px] items-center overflow-hidden rounded-full bg-[#222]/90 shadow-md transition-all duration-500 hover:shadow-lg sm:h-10 sm:w-[150px]">
        <motion.div
          layout
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
          className="absolute top-1 h-6 w-[calc(50%-4px)] rounded-full bg-[#f2bc07] shadow-inner sm:h-8 sm:w-[calc(50%-4px)]"
          animate={{
            left: isMarine ? "4px" : "calc(50% + 0px)",
          }}
        />

        <div className="z-10 flex w-full select-none text-sm font-medium">
          <button
            onClick={() => toggleActiveWorld("marine")}
            className={`flex flex-1 items-center justify-center transition-colors duration-300 ${
              isMarine ? "text-black" : "text-gray-400"
            }`}
          >
            Ocean
          </button>
          <button
            onClick={() => toggleActiveWorld("terrestial")}
            className={`flex flex-1 items-center justify-center transition-colors duration-300 ${
              !isMarine ? "text-black" : "text-gray-400"
            }`}
          >
            Land
          </button>
        </div>
      </div>
    </div>
  );
};
