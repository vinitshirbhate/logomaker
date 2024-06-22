import { Download } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

interface HeaderProps {
  DownloadIcon: (timestamp: number) => void; // Define props type
}

const Header: React.FC<HeaderProps> = ({ DownloadIcon }) => {
  return (
    <header className="bg-gray-200 py-4 dark:bg-gray-800 px-24 shadow-xl dark:shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex justify-center items-center gap-x-3">
          <img src="logo.png" alt="logo" width={35} />
          <h1 className="font-bold text-2xl text-sky-800 dark:text-sky-200">
            LOGO MAKER
          </h1>
        </div>
        <div className="flex flex-row justify-between items-center gap-4">
          <Button
            variant={"destructive"}
            className="flex flex-row gap-1"
            onClick={() => DownloadIcon(Date.now())}
          >
            <Download className="h-5" />
            DOWNLOAD
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
