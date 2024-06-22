import { useContext, useEffect, useState } from "react";
import { Slider } from "./ui/slider";
import ColorPickerController from "./ColorPickerController";
import { UpdateStorageContext } from "@/Context/UpdateStorageContext";

const BackgroundControl = () => {
  const storageValue = localStorage.getItem("value");

  let parsedValue: any;
  if (storageValue !== null) {
    try {
      parsedValue = JSON.parse(storageValue);
    } catch (error) {
      console.error("Error parsing JSON from localStorage:", error);
    }
  }

  const [rounded, setRounded] = useState(
    parsedValue ? parsedValue.bgRounded : 0
  );
  const [padding, setPadding] = useState(
    parsedValue ? parsedValue.bgPadding : 0
  );
  const [color, setColor] = useState(
    parsedValue ? parsedValue.bgColor : "#000"
  );
  const { setUpdateStorage } = useContext(UpdateStorageContext);

  useEffect(() => {
    const updatedValue = {
      ...parsedValue,
      bgRounded: rounded,
      bgPadding: padding,
      bgColor: color,
    };
    if (setUpdateStorage) {
      setUpdateStorage(updatedValue);
    }
    localStorage.setItem("value", JSON.stringify(updatedValue));
  }, [rounded, padding, color]);

  return (
    <div className="flex flex-col justify-center items-center gap-y-3">
      <div className="w-full">
        <label className="p-2 flex justify-between items-center">
          rounded <span>{rounded} px</span>
        </label>
        <Slider
          defaultValue={[0]}
          max={512}
          step={1}
          onValueChange={(value: number[]) => setRounded(value[0])}
        />
      </div>
      <div className="w-full">
        <label className="p-2 flex justify-between items-center">
          padding <span>{padding} px</span>
        </label>
        <Slider
          defaultValue={[0]}
          max={100}
          step={1}
          onValueChange={(value: number[]) => setPadding(value[0])}
        />
      </div>
      <div className="w-full">
        <label className="p-2 flex justify-between items-center">
          Color Picker
        </label>
        <ColorPickerController
          hideController={false}
          selectedColor={(color: string) => setColor(color)}
        />
      </div>
    </div>
  );
};

export default BackgroundControl;
