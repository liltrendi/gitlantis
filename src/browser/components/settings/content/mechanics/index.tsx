import { SharedSlider } from "@/browser/components/shared/slider";
import type { useGameSettings } from "@/browser/hooks/useGame/settings";

export const SettingsMechanics = (
  gameProps: ReturnType<typeof useGameSettings>
) => {
  return (
    <>
      <h3 className="text-xl text-gray-200 font-semibold mb-[15px]">
        {gameProps.activeTab.description[0]}
      </h3>
      <SharedSlider
        label="Speed"
        min={1}
        max={10}
        value={gameProps.settings.boatSpeed}
        setter={gameProps.setBoatSpeed}
      />
      <SharedSlider
        label="Acceleration"
        min={0.001}
        max={1}
        value={gameProps.settings.acceleration}
        setter={gameProps.setBoatAcceleration}
      />
      <SharedSlider
        label="Deceleration"
        min={0.001}
        max={1}
        value={gameProps.settings.deceleration}
        setter={gameProps.setBoatDeceleration}
      />
      <SharedSlider
        label="Turn speed"
        min={0.01}
        max={0.05}
        value={gameProps.settings.turnSpeed}
        setter={gameProps.setBoatTurnSpeed}
      />
      <SharedSlider
        label="Turn deceleration"
        min={0.01}
        max={0.1}
        value={gameProps.settings.turnDeceleration}
        setter={gameProps.setBoatTurnDeceleration}
      />

      <h3 className="text-xl text-gray-200 font-semibold mb-[15px] pt-[20px]">
        {gameProps.activeTab.description[1]}
      </h3>
    </>
  );
};
