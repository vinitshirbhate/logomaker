import { useState } from "react";
import BackgroundControl from "./components/BackgroundControl";
import ControlPanel from "./components/ControlPanel";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import { LogoPreview } from "./components/LogoPreview";
import { UpdateStorageContext } from "./Context/UpdateStorageContext";

function App() {
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(0);
  const [updateStorage, setUpdateStorage] = useState({});
  const [downloadIcon, setDownloadIcon] = useState<number | undefined>();

  return (
    <UpdateStorageContext.Provider value={{ updateStorage, setUpdateStorage }}>
      <div className="overflow-hidden">
        <Header DownloadIcon={setDownloadIcon} />
        <div className="w-64 fixed">
          <SideBar
            selectedIndex={(val) => {
              setSelectedIndex(val);
            }}
          />
        </div>
        <div className="ml-64 grid grid-cols-1 md:grid-cols-5">
          <div className="md:col-span-2 border shadow-sm p-3 px-10">
            {selectedIndex === 0 ? <ControlPanel /> : <BackgroundControl />}
          </div>
          <div className="md:col-span-3">
            <LogoPreview DownloadIcon={downloadIcon} />
          </div>
        </div>
      </div>
    </UpdateStorageContext.Provider>
  );
}

export default App;
