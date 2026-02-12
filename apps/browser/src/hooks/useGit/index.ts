import { useBranches } from "@/hooks/useGit/useBranch";

export const useGit = () => {
  const branches = useBranches();

  return { branches };
};
