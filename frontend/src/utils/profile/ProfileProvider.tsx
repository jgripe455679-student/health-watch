import React, { useState } from "react";
import profileContext from "./profileContext";

export type ProfileContextProps = {
  isEditing: boolean;
  update: () => void;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};

const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
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
    <profileContext.Provider
      value={{ isEditing, startEditing, stopEditing, message, setMessage }}
    >
      {children}
    </profileContext.Provider>
  );
};
export default ProfileProvider;
