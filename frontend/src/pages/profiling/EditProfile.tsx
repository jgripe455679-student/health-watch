import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../../api/apiClient";
import ProfileForm from "../../components/ProfileForm";
import { useProfiling } from "../../hooks/useProfiling";
import { Profile } from "./Profiling";

const EditProfile: React.FC = () => {
  const { isEditing, setMessage, startEditing } = useProfiling();
  const [profileDetails, setProfileDetails] = useState<Profile | null>(null);
  const { id } = useParams();
  const profileId = Number(id);

  useEffect(() => {
    const getProfileDetailsToEdit = async (): Promise<void> => {
      try {
        if (profileDetails === null) {
          const response = await get("/profiles/" + profileId);
          setProfileDetails(response.data as Profile);
          startEditing();
        }
      } catch (error) {
        console.error("Error fetch profile data: ", error);
      }
    };
    getProfileDetailsToEdit();
  }, [startEditing, profileDetails, profileId]);
  return (
    <>
      <h1 className="text-4xl p-1.5 pl-0 mb-2.5">Edit Profile</h1>
      {profileDetails && (
        <ProfileForm
          isEditing={isEditing}
          setMessage={setMessage}
          profileDetails={profileDetails}
        />
      )}
    </>
  );
};

export default EditProfile;
