import type { useGameSettings } from "@/browser/hooks/useGame/settings";

const SharedSlider = ({
  label,
  value,
  min,
  max,
  setter,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  setter: (value: number) => void;
}) => {
  const percentValue = ((value - min) / (max - min)) * 100;

  return (
    <label className="block mb-[20px]">
      <span className="flex flex-row justify-between">
        <span className="text-md">{label}</span>
        <span className="text-md">{value.toFixed(2)}</span>
      </span>
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        className="w-full mt-3"
        value={percentValue}
        onChange={(e) => {
          const sliderPercent = Number(e.target.value) / 100;
          const actualValue = min + sliderPercent * (max - min);
          setter(Number(actualValue.toFixed(4)));
        }}
      />
    </label>
  );
};

export const SettingsMechanics = (
  gameProps: ReturnType<typeof useGameSettings>
) => {
  return (
    <>
      <h3 className="text-xl font-semibold mb-[20px]">
        {gameProps.activeTab.description}
      </h3>
      <SharedSlider
        label="Sail speed"
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
    </>
  );
};
