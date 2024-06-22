import { Image, PencilRuler } from "lucide-react";
import { useState } from "react";

interface SideBarProps {
  selectedIndex: (value: number) => void;
}

const SideBar: React.FC<SideBarProps> = ({ selectedIndex }) => {
  const MenuList = [
    {
      id: 1,
      name: "Icon",
      icon: PencilRuler,
    },
    {
      id: 2,
      name: "Background",
      icon: Image,
    },
  ];

  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="border shadow-xl h-screen overflow-y-auto">
      <div>
        {MenuList.map((menu, index) => (
          <h2
            onClick={() => {
              setActive(index);
              selectedIndex(index);
            }}
            className={`p-3 text-lg px-7 text-gray-500 my-2 cursor-pointer hover:bg-red-700 hover:rounded-lg hover:text-white flex items-center gap-2 ${
              active === index ? "bg-red-700 text-white rounded-lg" : ""
            }`}
            key={menu.id}
          >
            <menu.icon />
            {menu.name}
          </h2>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
