import { useBranches } from "@/browser/hooks/useGit/useBranch";

export const useGit = () => {
  const branches = useBranches();

  return { branches };
};
