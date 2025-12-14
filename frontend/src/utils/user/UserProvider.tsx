import { useState } from "react";
import userContext from "./userContext";

export type UserContextProps = {
  isEditing: boolean;
  update: () => void;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const startEditing = () => {
    setIsEditing(true);
  };

  const stopEditing = () => {
    setIsEditing(false);
  };

  return (
    <userContext.Provider
      value={{ isEditing, startEditing, stopEditing, message, setMessage }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
