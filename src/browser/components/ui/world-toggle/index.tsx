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
      <div className="fixed right-[10px] top-[10px] z-[51] flex w-fit items-center rounded-full bg-[#222]/90 p-1 shadow-md backdrop-blur-sm transition-all duration-500 hover:shadow-lg">
        <button
          onClick={() => toggleActiveWorld("marine")}
          className={`relative z-10 flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
            isMarine ? "text-black" : "text-gray-400 hover:text-gray-200"
          }`}
        >
          <span className="relative z-20">Filesystem</span>
          {isMarine && (
            <motion.div
              layoutId="active-world-bg"
              className="absolute inset-0 z-10 rounded-full bg-[#f2bc07] shadow-inner"
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
            />
          )}
        </button>
        <button
          onClick={() => toggleActiveWorld("terrestial")}
          className={`relative z-10 flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
            !isMarine ? "text-black" : "text-gray-400 hover:text-gray-200"
          }`}
        >
          <span className="relative z-20">Sponsors</span>
          {!isMarine && (
            <motion.div
              layoutId="active-world-bg"
              className="absolute inset-0 z-10 rounded-full bg-[#f2bc07] shadow-inner"
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
            />
          )}
        </button>
      </div>
    </div>
  );
};
