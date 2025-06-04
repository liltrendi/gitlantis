import { useGameStore } from "@/browser/store";
import { useEffect, useRef, useState } from "react";

const tabs = [{label: "Display", description: "Display settings"}, {label: "Mechanics", description: "Game mechanics"}];

export const useGameSettings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);
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
    ...{setIsOpen, setActiveTab, ...setters },
  };
};
