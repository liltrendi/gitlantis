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
      <div className="fixed right-[10px] top-[10px] z-[51] flex w-fit flex-col items-stretch rounded-[20px] bg-[#222]/90 p-1 shadow-md backdrop-blur-sm transition-all duration-500 hover:shadow-lg sm:flex-row sm:items-center sm:rounded-full">
        <motion.div
          layout
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
          className={`absolute left-1 h-[calc(50%-4px)] w-[calc(100%-8px)] rounded-full bg-[#f2bc07] shadow-inner sm:top-1 sm:h-[calc(100%-8px)] sm:w-[calc(50%-4px)]`}
          animate={{
            top:
              window.innerWidth < 640
                ? isMarine
                  ? "4px"
                  : "calc(50%)"
                : "4px",
            left:
              window.innerWidth >= 640
                ? isMarine
                  ? "4px"
                  : "calc(50%)"
                : "4px",
          }}
        />

        <button
          onClick={() => toggleActiveWorld("marine")}
          className={`relative z-10 flex flex-1 items-center justify-center whitespace-nowrap rounded-full px-3 py-[3px] text-sm font-medium transition-colors duration-300 sm:py-2 ${
            isMarine ? "text-black" : "text-gray-400"
          }`}
        >
          Filesystem
        </button>
        <button
          onClick={() => toggleActiveWorld("terrestial")}
          className={`relative z-10 flex flex-1 items-center justify-center whitespace-nowrap rounded-full px-3 py-[3px] text-sm font-medium transition-colors duration-300 sm:py-2 ${
            !isMarine ? "text-black" : "text-gray-400"
          }`}
        >
          Commits
        </button>
      </div>
    </div>
  );
};
