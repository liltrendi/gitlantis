import { useGameStore } from "@/browser/store";
import { useEffect, useRef, useState } from "react";

const tabs = [
  { label: "General", description: ["Display", "Guides"] },
  { label: "Behavior", description: ["Navigation", "Collision"] },
  { label: "Keybindings", description: ["Basic controls", "Special keys"] },
  { label: "About", description: ["Overview", "Attribution"] },
] as const;

type TSettingsTab = (typeof tabs)[number]["label"];

export const useGameSettings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<{
    label: TSettingsTab;
    description: Readonly<string | string[]>;
  }>(tabs[0]);
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
    tabs,
    isOpen,
    activeTab,
    settings,
    modalRef,
    ...{ setIsOpen, setActiveTab, ...setters },
  };
};
