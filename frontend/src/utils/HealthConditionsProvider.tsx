import React, { useState } from "react";
import healthConditionsContext from "./healthConditionsContext";

export type HealthCondition = {
  healthCondition: string;
};

export type HealthConditionsContextProps = {
  healthConditions: HealthCondition[];
  populateHealthConditions: (healthConditions: HealthCondition[]) => void;
};

const HealthConditionsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [healthConditions, setHealthConditions] = useState<HealthCondition[]>(
    []
  );

  const populateHealthConditions = (healthConditions: HealthCondition[]) => {
    setHealthConditions(healthConditions);
  };

  return (
    <healthConditionsContext.Provider
      value={{ healthConditions, populateHealthConditions }}
    >
      {children}
    </healthConditionsContext.Provider>
  );
};

export default HealthConditionsProvider;
