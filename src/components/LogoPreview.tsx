// @ts-nocheck

import { icons } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { UpdateStorageContext } from "@/Context/UpdateStorageContext";
import html2canvas from "html2canvas";

interface LogoValue {
  bgRounded?: string;
  bgColor?: string;
  icon?: string;
  iconColor?: string;
  iconSize?: number;
  bgPadding?: number;
  iconRotate?: number;
}

type IconType = {
  name?: string;
  color?: string;
  size?: number;
  rotate?: number;
};

interface LogoPreviewProps {
  DownloadIcon?: number | undefined;
}

export const LogoPreview: React.FC<LogoPreviewProps> = ({ DownloadIcon }) => {
  const [storageValue, setStorageValue] = useState<LogoValue | undefined>(
    undefined
  );
  const { updateStorage } = useContext(UpdateStorageContext);

  useEffect(() => {
    const storedValue = localStorage.getItem("value");
    let value: LogoValue = {};

    if (storedValue) {
      try {
        value = JSON.parse(storedValue) as LogoValue;
      } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
      }
    }
    console.log(storedValue);

    setStorageValue(value);
  }, [updateStorage]);

  useEffect(() => {
    if (DownloadIcon !== undefined) {
      downloadPngLogo();
    }
  }, [DownloadIcon]);

  const downloadPngLogo = () => {
    const downloadpng = document.getElementById("downloadpng");
    if (downloadpng) {
      html2canvas(downloadpng, {
        backgroundColor: null,
      }).then((canvas) => {
        const pngImage = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = pngImage;
        downloadLink.download = "LOGOMAKER.png";
        downloadLink.click();
      });
    }
  };

  const Icons: React.FC<IconType> = ({ name, color, size, rotate }) => {
    const LucidIcon = name ? icons[name] : null;
    if (!LucidIcon) {
      return null;
    }
    return (
      <LucidIcon
        color={color}
        size={size}
        style={{ transform: `rotate(${rotate ?? 0}deg)` }}
      />
    );
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div
        className="h-[500px] w-[500px] bg-gray-300 outline-dotted outline-gray-400 rounded-sm"
        style={{
          padding: storageValue?.bgPadding,
        }}
      >
        <div
          id="downloadpng"
          className="h-full w-full flex items-center justify-center"
          style={{
            borderRadius: storageValue?.bgRounded ?? "0px",
            background: storageValue?.bgColor ?? "transparent",
          }}
        >
          {storageValue?.icon?.includes(".png") ? (
            <img
              src={`/png/${storageValue.icon}`}
              alt="Icon"
              style={{
                height: storageValue.iconSize,
                width: storageValue.iconSize,
              }}
            />
          ) : (
            <Icons
              name={storageValue?.icon}
              color={storageValue?.iconColor}
              size={storageValue?.iconSize}
              rotate={storageValue?.iconRotate}
            />
          )}
        </div>
      </div>
    </div>
  );
};
