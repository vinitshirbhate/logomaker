import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Smile, icons } from "lucide-react";
import { iconList } from "./icons";
import { useEffect, useState } from "react";
import axios from "axios";

type IconType = {
  name?: string;
  color?: string;
  size?: number;
  rotate?: number;
};

type IconsListProps = {
  selectedIcon: (icon: string) => void;
};

export const COLOR_ICON_URL = "https://logoexpress.tubeguruji.com";

const IconsList: React.FC<IconsListProps> = ({ selectedIcon }) => {
  const Icons = ({ name, color, size, rotate }: IconType) => {
    const LucidIcons = icons[name!];
    if (!LucidIcons) {
      return null;
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
  const [PNGIcon, setPNGIcon] = useState<string[]>([]);

  useEffect(() => {
    const getColorIcon = async () => {
      try {
        const { data } = await axios.get<string[]>(
          COLOR_ICON_URL + "/getIcons.php"
        );
        setPNGIcon(data);
      } catch (error) {
        console.error("Error fetching colored icons:", error);
      }
    };
    getColorIcon();
  }, []);

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
              <Tabs defaultValue="icon" className="w-[400px]">
                <TabsList>
                  <TabsTrigger value="icon">Icons</TabsTrigger>
                  <TabsTrigger value="color-icon">Colored Icons</TabsTrigger>
                </TabsList>
                <TabsContent value="icon">
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 overflow-auto h-[400px]  p-4">
                    {iconList.map((icon) => (
                      <button
                        key={icon}
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
                </TabsContent>
                <TabsContent value="color-icon">
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 overflow-auto h-[400px]  p-2">
                    {PNGIcon.map((icon, index) => (
                      <button
                        key={index}
                        className="border flex p-3 rounded-lg items-center justify-center"
                        onClick={() => {
                          selectedIcon(icon);
                          setOpenDialog(false);
                        }}
                      >
                        <img
                          src={COLOR_ICON_URL + "/png/" + icon}
                          alt="Icon"
                          className="w-10 h-10"
                        />
                      </button>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IconsList;
