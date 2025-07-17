import { useState } from "react";

export const useBranchSelection = () => {
  const DEFAULT_BRANCH = "main";
  const allBranches = [
    DEFAULT_BRANCH,
    "test/feature",
    "feat/auth",
    "hotfix/bugfix",
  ];
  const [currentBranch, setCurrentBranch] = useState(allBranches[0]);
  const [isPickerOpen, setPickerOpen] = useState(false);

  const handleBranchSelection = (branch: string) => {
    setCurrentBranch(branch);
    setPickerOpen(false);
  };

  return {
    allBranches,
    currentBranch,
    handleBranchSelection,
    isPickerOpen,
    setPickerOpen,
  };
};
