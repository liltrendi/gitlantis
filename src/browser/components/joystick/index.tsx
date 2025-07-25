import { useEffect, useRef } from "react";
import nipplejs, {
  JoystickManager,
  type JoystickManagerOptions,
  type JoystickOutputData,
} from "nipplejs";
import { useGameContext } from "@/browser/hooks/useGame/context";

export const Joystick = () => {
  const joystickRef = useRef<HTMLDivElement>(null);
  const managerRef = useRef<JoystickManager | null>(null);
  const { showSplashScreen, directionInputRef } = useGameContext();

  const onMove = (dx: number, dy: number) => {
    const threshold = 0.2;
    directionInputRef.current.forward = dy > threshold;
    directionInputRef.current.backward = dy < -threshold;
    directionInputRef.current.left = dx < -threshold;
    directionInputRef.current.right = dx > threshold;
  };

  useEffect(() => {
    if (!joystickRef.current) return;

    const options: JoystickManagerOptions = {
      zone: joystickRef.current,
      mode: "dynamic",
      color: "red",
      size: 100,
      restOpacity: 0.4,
    };

    const manager = nipplejs.create(options);
    managerRef.current = manager;

    manager.on("move", (_, data: JoystickOutputData) => {
      const angle = data.angle?.radian ?? 0;
      const force = data.force ?? 0;
      const dx = Math.cos(angle) * force;
      const dy = Math.sin(angle) * force;
      onMove(dx, dy);
    });

    manager.on("end", () => {
      onMove(0, 0);
    });

    return () => {
      manager.destroy();
      managerRef.current = null;
    };
  }, []);

  return (
    <div
      ref={joystickRef}
      className={`fixed inset-0 z-50 md:invisible touch-none transition-opacity duration-300 ${
        showSplashScreen
          ? "opacity-0 pointer-events-none"
          : "opacity-100 delay-[1700ms]"
      }`}
    />
  );
};
