import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Smile, icons } from "lucide-react";
import { iconList } from "./icons";
import { useState } from "react";

type IconType = {
  name?: string;
  color?: string;
  size?: number;
  rotate?: number;
};

const IconsList = ({ selectedIcon }: any) => {
  const Icons = ({ name, color, size, rotate }: IconType) => {
    const LucidIcons = icons[name];
    if (!LucidIcons) {
      return;
    }
    return (
      <LucidIcons
        color={color}
        size={size}
        style={{ transform: `rotate(${rotate}deg)` }}
      />
    );
  };
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <div>
      <div>
        <div
          onClick={() => setOpenDialog(true)}
          className="p-3 cursor-pointer bg-gray-300 rounded-md w-[50px] h-[50px] border dark:bg-slate-700 flex items-center py-2"
        >
          <Smile />
        </div>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pick Your Icon</DialogTitle>
            <DialogDescription>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 overflow-auto h-[400px] p-4">
                {iconList.map((icon) => (
                  <button
                    className="border flex p-3 rounded-lg items-center justify-center"
                    onClick={() => {
                      selectedIcon(icon);
                      setOpenDialog(false);
                    }}
                  >
                    <Icons name={icon} size={20} color={"#fff"} />
                  </button>
                ))}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IconsList;
