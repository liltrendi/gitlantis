import { Lights } from "@/components/lights";
import { useRecalibration } from "@/hooks/useRecalibration";

export const Setup = () => {
  useRecalibration();

  return <Lights />;
};
