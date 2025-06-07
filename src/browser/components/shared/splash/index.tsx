import { useGameContext } from "@/browser/hooks/useGame/context";

export const Splash = () => {
  const {settings, splashScreenInvisible, setSplashScreenInvisible} = useGameContext()

  if(settings.splashScreen === "Hide") return;

  return (
    <div
      className={`fixed inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center z-50 transition-opacity duration-[2500ms] ${
        splashScreenInvisible ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <h1 className="text-6xl md:text-7xl font-extrabold text-[#eee] mb-10">
        Gitlantis
      </h1>
      <button
        onClick={() => setSplashScreenInvisible(true)}
        className="px-6 py-3 rounded-full bg-[#f2bc07] text-black font-semibold text-lg hover:scale-105 transition-transform"
      >
        Begin expedition
      </button>
    </div>
  );
}
