import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../../api/apiClient";
import UserForm from "../../components/UserForm";
import { useUserManagement } from "../../hooks/useUserManagement";
import { User } from "./UserManagement";

const EditUser: React.FC = () => {
  const { isEditing, setMessage, startEditing } = useUserManagement();
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const { id } = useParams();
  const userId = Number(id);

  useEffect(() => {
    const getUserDetailsToEdit = async (): Promise<void> => {
      try {
        if (userDetails === null) {
          const response = await get("/users/" + userId);
          setUserDetails(response.data as User);
          startEditing();
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };
    getUserDetailsToEdit();
  }, [startEditing, userDetails, userId]);
  return (
    <>
      <h1 className="text-4xl p-1.5 pl-0 mb-2.5">Edit User</h1>
      {userDetails && (
        <UserForm
          isEditing={isEditing}
          setMessage={setMessage}
          userDetails={userDetails}
        />
      )}
    </>
  );
};

export default EditUser;
