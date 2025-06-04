import { useGameStore } from "@/browser/store";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const TABS = ["Display", "Controls"];

export const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const { setShowBreadcrumbs, setShowCompass, setShowMinimap, settings } =
    useGameStore();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "Display":
        return (
          <>
            <h3 className="text-xl font-semibold mb-[20px]">
              Display Settings
            </h3>
            <label className="block mb-[20px]">
              <span className="text-md">Minimap</span>
              <select
                className="w-full bg-gray-800 border border-gray-600 px-2 py-2 rounded mt-3"
                onChange={(e) => setShowMinimap(e.target.value === "On")}
                value={settings.showMinimap ? "On" : "Off"}
              >
                <option>Off</option>
                <option>On</option>
              </select>
            </label>
            <label className="block mb-[20px]">
              <span className="text-md">Compass</span>
              <select
                className="w-full bg-gray-800 border border-gray-600 px-2 py-2 rounded mt-3"
                onChange={(e) => setShowCompass(e.target.value === "On")}
                value={settings.showCompass ? "On" : "Off"}
              >
                <option>Off</option>
                <option>On</option>
              </select>
            </label>
            <label className="block mb-[20px]">
              <span className="text-md">Breadcrumbs</span>
              <select
                className="w-full bg-gray-800 border border-gray-600 px-2 py-2 rounded mt-3"
                onChange={(e) => setShowBreadcrumbs(e.target.value === "On")}
                value={settings.showBreadcrumbs ? "On" : "Off"}
              >
                <option>Off</option>
                <option>On</option>
              </select>
            </label>
          </>
        );
      case "Controls":
        return (
          <>
            <h3 className="text-xl font-semibold mb-[20px]">
              Controls Settings
            </h3>
            <label className="block mb-[20px]">
              <span className="text-md">Boat Speed</span>
              <input type="range" min={0} max={100} className="w-full mt-3" />
            </label>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="absolute top-3 right-3 z-50 text-white text-lg color-[#fff] bg-black/80 hover:bg-black/70 px-3 py-2 rounded-lg"
      >
        ⚙️
      </button>

      {isOpen &&
        createPortal(
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
            <div
              ref={modalRef}
              className="bg-[#1e1e1e] text-white w-[60vw] h-[75vh] rounded-2xl shadow-lg p-0 flex overflow-hidden border border-gray-600 relative"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-white hover:text-red-400 z-10"
              >
                ✕
              </button>

              <div className="w-1/3 bg-[#151515] p-4 border-r border-gray-700 space-y-2">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`w-full text-left px-3 py-2 rounded hover:bg-gray-700 ${
                      activeTab === tab ? "bg-gray-700 font-semibold" : ""
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="w-2/3 p-6 overflow-y-auto">
                {renderTabContent()}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
