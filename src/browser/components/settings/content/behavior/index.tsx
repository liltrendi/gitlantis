import { SharedSlider } from "@/browser/components/shared/slider";
import type { useGameSettings } from "@/browser/hooks/useGame/settings";

export const SettingsBehavior = (
  gameProps: ReturnType<typeof useGameSettings>
) => {
  return (
    <>
      <h3 className="mb-[15px] text-xl font-semibold text-gray-200">
        {gameProps.activeTab.description[0]}
      </h3>
      <SharedSlider
        label="Speed"
        min={1}
        max={10}
        value={gameProps.settings.boatSpeed}
        setter={gameProps.setBoatSpeed}
        tooltip="The boat's top speed"
      />
      <SharedSlider
        label="Acceleration"
        min={0.001}
        max={1}
        value={gameProps.settings.acceleration}
        setter={gameProps.setBoatAcceleration}
        tooltip="How quickly the boat speeds up"
      />
      <SharedSlider
        label="Deceleration"
        min={0.001}
        max={1}
        value={gameProps.settings.deceleration}
        setter={gameProps.setBoatDeceleration}
        tooltip="How quickly the boat slows down"
      />
      <SharedSlider
        label="Turn speed"
        min={0.01}
        max={0.05}
        value={gameProps.settings.turnSpeed}
        setter={gameProps.setBoatTurnSpeed}
        tooltip="How quickly the boat turns"
      />
      <SharedSlider
        label="Turn deceleration"
        min={0.01}
        max={0.1}
        value={gameProps.settings.turnDeceleration}
        setter={gameProps.setBoatTurnDeceleration}
        tooltip="How quickly turning slows"
      />

      <h3 className="mb-[15px] pt-[20px] text-xl font-semibold text-gray-200">
        {gameProps.activeTab.description[1]}
      </h3>

      <SharedSlider
        label="Rocking amplitude"
        min={0.01}
        max={0.1}
        value={gameProps.settings.rockingAmplitude}
        setter={gameProps.setRockingAmplitude}
        tooltip="Side tilt amount"
      />

      <SharedSlider
        label="Rocking speed"
        min={0.1}
        max={1}
        value={gameProps.settings.rockingSpeed}
        setter={gameProps.setRockingSpeed}
        tooltip="Side tilt speed"
      />

      <SharedSlider
        label="Bobbing amplitude"
        min={0.01}
        max={1}
        value={gameProps.settings.bobbingAmplitude}
        setter={gameProps.setBobbingAmplitude}
        tooltip="Vertical bounce amount"
      />

      <SharedSlider
        label="Bobbing speed"
        min={0.1}
        max={1}
        value={gameProps.settings.bobbingSpeed}
        setter={gameProps.setBobbingSpeed}
        tooltip="Vertical bounce speed"
      />

      <h3 className="mb-[15px] pt-[20px] text-xl font-semibold text-gray-200">
        {gameProps.activeTab.description[2]}
      </h3>

      <SharedSlider
        label="Impact radius"
        min={50}
        max={300}
        value={gameProps.settings.collisionRadius}
        setter={gameProps.setCollisionRadius}
        tooltip="Distance within which boat collides"
      />

      <SharedSlider
        label="Deflection strength"
        min={1}
        max={10}
        value={gameProps.settings.collisionPushStrength}
        setter={gameProps.setCollisionPushStrength}
        tooltip="Force applied on collision"
      />
    </>
  );
};
