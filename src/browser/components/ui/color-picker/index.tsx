import { useState, useRef, useEffect } from "react";
import { Tooltip } from "@/browser/components/ui/tooltip";
import { ChromePicker } from "react-color";

export const SharedColorPicker = ({
  label,
  value,
  tooltip,
  onChangeComplete,
}: {
  label: string;
  value: string;
  tooltip?: string;
  onChangeComplete: (hex: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [tempColor, setTempColor] = useState(value);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="group relative mb-[20px] block">
      <div className="flex items-center gap-[5px]">
        <span className="text-md text-gray-400">{label}</span>
        <Tooltip tooltip={tooltip} />
      </div>

      <div className="relative mt-3 flex items-center gap-3" ref={pickerRef}>
        <div
          className="flex cursor-pointer items-center"
          onClick={() => setOpen((prev) => !prev)}
        >
          <div
            className="h-8 w-12 rounded border border-gray-600"
            style={{ backgroundColor: value }}
          />
          <span className="ml-3 text-sm text-gray-300">{value}</span>
        </div>

        {open && (
          <div className="absolute z-10 mt-2">
            <ChromePicker
              color={tempColor}
              onChange={(color) => setTempColor(color.hex)}
              onChangeComplete={(color) => onChangeComplete(color.hex)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
