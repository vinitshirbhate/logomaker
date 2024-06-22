import { Slider } from "@/components/ui/slider";
import { useContext, useEffect, useState } from "react";
import ColorPickerController from "./ColorPickerController";
import { UpdateStorageContext } from "@/Context/UpdateStorageContext";
import IconsList from "@/iconsList/IconsList";

const ControlPanel = () => {
  const storageValue = localStorage.getItem("value");
  let parsedValue: any;
  if (storageValue !== null) {
    try {
      parsedValue = JSON.parse(storageValue);
    } catch (error) {
      console.error("Error parsing JSON from localStorage:", error);
    }
  }

  const [size, setSize] = useState(parsedValue ? parsedValue?.iconSize : 280);
  const [rotate, setRotate] = useState(
    parsedValue ? parsedValue?.iconRotate : 0
  );
  const [color, setColor] = useState(
    parsedValue ? parsedValue?.iconColor : "#fff"
  );
  const [icon, setIcon] = useState(parsedValue ? parsedValue?.icon : "Smile");
  const { setUpdateStorage } = useContext(UpdateStorageContext);

  useEffect(() => {
    const updatedValue = {
      ...parsedValue,
      iconSize: size,
      iconRotate: rotate,
      iconColor: color,
      icon: icon,
    };
    if (setUpdateStorage) {
      setUpdateStorage(updatedValue);
    }
    localStorage.setItem("value", JSON.stringify(updatedValue));
  }, [size, rotate, color, icon]);

  return (
    <div>
      <label>Icon</label>
      <IconsList selectedIcon={(icon: string) => setIcon(icon)} />
      <div>
        <label className="p-2 flex justify-between items-center">
          Size <span>{size} px</span>
        </label>
        <Slider
          defaultValue={[size]}
          max={512}
          step={1}
          onValueChange={(value: number[]) => setSize(value[0])}
        />
      </div>
      <div>
        <label className="p-2 flex justify-between items-center">
          Rotate <span>{rotate} °</span>
        </label>
        <Slider
          defaultValue={[rotate]}
          max={360}
          step={1}
          onValueChange={(value: number[]) => setRotate(value[0])}
        />
      </div>
      <div>
        <label className="p-2 flex justify-between items-center">
          Color Picker
        </label>
        <ColorPickerController
          hideController={true}
          selectedColor={(color: string) => setColor(color)}
        />
      </div>
    </div>
  );
};

export default ControlPanel;
