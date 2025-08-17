import { createContext } from "react";
import { HealthConditionsContextProps } from "./HealthConditionsProvider";

const healthConditionsContext = createContext<HealthConditionsContextProps | undefined>(undefined);

export default healthConditionsContext;