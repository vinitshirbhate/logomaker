import { useState } from "react";
import ColorPicker from "react-best-gradient-color-picker";

interface ColorPickerControllerProps {
  hideController?: boolean;
  selectedColor: (color: string) => void;
}

const ColorPickerController: React.FC<ColorPickerControllerProps> = ({
  hideController = false,
  selectedColor,
}) => {
  const [color, setColor] = useState<string>("rgba(255,255,255,1)");

  return (
    <div>
      <ColorPicker
        value={color}
        onChange={(e: string) => {
          setColor(e);
          selectedColor(e);
        }}
        hideControls={hideController}
        hideEyeDrop
        hideAdvancedSliders
        hideColorGuide
        hideInputType
      />
    </div>
  );
};

export default ColorPickerController;
