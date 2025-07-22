import { Tooltip } from "@/browser/components/ui/tooltip";

export const SharedSlider = ({
  label,
  value,
  min,
  max,
  tooltip,
  setter,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  tooltip?: string;
  setter: (_: number) => void;
}) => {
  const percentValue = ((value - min) / (max - min)) * 100;

  return (
    <label className="mb-[20px] block">
      <span className="flex flex-row justify-between">
        <span className="text-md flex items-center justify-center gap-[5px] text-gray-400">
          {label}
          <span>
            <Tooltip tooltip={tooltip} />
          </span>
        </span>
        <span className="text-sm text-gray-400">{value.toFixed(2)}</span>
      </span>
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        className="mt-5 h-[4px] w-full appearance-none rounded-lg bg-gray-800 accent-yellow-400 outline-none"
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
