import { useState } from "react";

const useBranches = () => {
  const DEFAULT_BRANCH = "main";
  const allBranches = [
    DEFAULT_BRANCH,
    "test/feature",
    "feat/auth",
    "hotfix/bugfix",
  ];
  return { allBranches };
};

export const useBranchSelection = () => {
  const { allBranches } = useBranches();

  const [currentBranch, setCurrentBranch] = useState(allBranches[0]);
  const [isPickerOpen, setPickerOpen] = useState(false);

  const handleBranchSelection = (branch: string) => {
    setCurrentBranch(branch);
    setPickerOpen(false);
  };

  const toggleBranchPicker = () => setPickerOpen((prev) => !prev);

  return {
    allBranches,
    currentBranch,
    isPickerOpen,
    toggleBranchPicker,
    handleBranchSelection,
  };
};
