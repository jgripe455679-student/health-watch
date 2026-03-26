import React from "react";
import ProfileForm from "../../components/ProfileForm";
import { useProfiling } from "../../hooks/useProfiling";

const NewProfile: React.FC = () => {
  const { isEditing, setMessage } = useProfiling();
  return (
    <>
      <h1 className="text-4xl p-1.5 pl-0 mb-2.5">New Profile</h1>
      <ProfileForm isEditing={isEditing} setMessage={setMessage} />
    </>
  );
};

export default NewProfile;
