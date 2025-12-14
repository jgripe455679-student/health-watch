import React from "react";
import UserForm from "../../components/UserForm";
import { useUserManagement } from "../../hooks/useUserManagement";

const NewUser: React.FC = () => {
  const { isEditing, setMessage } = useUserManagement();
  return (
    <>
      <h1 className="text-4xl p-1.5 pl-0 mb-2.5">New User</h1>
      <UserForm isEditing={isEditing} setMessage={setMessage} />
    </>
  );
};

export default NewUser;
