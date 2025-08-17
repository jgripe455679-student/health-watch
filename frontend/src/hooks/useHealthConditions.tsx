import { useContext } from "react";
import { HealthConditionsContextProps } from "../utils/HealthConditionsProvider";
import healthConditionsContext from "../utils/healthConditionsContext";

export const useHealthConditions: () => HealthConditionsContextProps = () => {
  const context: HealthConditionsContextProps | undefined = useContext(
    healthConditionsContext
  );
  if (!context) {
    throw new Error(
      "useHealthConditions must be used within an HealthConditionsProvider"
    );
  }
  return context;
};
