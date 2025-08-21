import { useGameStore } from "@/browser/hooks/useGame/store";
import { useEffect, useRef, useState } from "react";

const SETTINGS_TABS = [
  {
    label: "General",
    description: ["Display", "Boat colors", "Audio", "Guides"],
  },
  { label: "Behavior", description: ["Navigation", "Floating", "Collision"] },
  { label: "Keybindings", description: ["Basic controls", "Special keys"] },
  { label: "About", description: ["Overview", "Attribution"] },
  { label: "Danger zone", description: ["Restore default settings"] },
] as const;

export const useGameSettings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<{
    label: (typeof SETTINGS_TABS)[number]["label"];
    description: Readonly<string | string[]>;
  }>(SETTINGS_TABS[0]);
  const modalRef = useRef<HTMLDivElement>(null);

  const { settings, ...setters } = useGameStore();

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

  return {
    tabs: SETTINGS_TABS,
    isOpen,
    activeTab,
    settings,
    modalRef,
    ...{ setIsOpen, setActiveTab, ...setters },
  };
};
