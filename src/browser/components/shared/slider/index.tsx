export const SharedSlider = ({
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
        <span className="text-md text-gray-400">{label}</span>
        <span className="text-sm text-gray-400">{value.toFixed(2)}</span>
      </span>
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        className="w-full mt-3 appearance-none h-[4px] bg-gray-800 rounded-lg outline-none accent-yellow-400"
        style={{
          background: `linear-gradient(to right, #f2bc07 0%, #f2bc07 ${percentValue}%, #3f3f46 ${percentValue}%, #3f3f46 100%)`,
        }}
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
