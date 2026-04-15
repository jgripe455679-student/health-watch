import React, { useEffect, useState } from "react";
import { Profile } from "./Profiling";
import { useNavigate, useParams } from "react-router-dom";
import { deleteRequest, get } from "../../api/apiClient";
import Dialog from "../../components/Dialog";
import { useProfiling } from "../../hooks/useProfiling";

const ViewProfile: React.FC = () => {
    const [profileDetails, setProfileDetails] = useState<Profile | null>(null);
    const { id } = useParams();
    const profileId = Number(id);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    const { setMessage } = useProfiling();

    useEffect(() => {
        const getProfileDetailsToView = async (): Promise<void> => {
            try {
                if (profileDetails === null) {
                    const response = await get("/profiles/" + profileId);
                    setProfileDetails(response.data as Profile);
                    setSelectedIds(prevSet => new Set([...prevSet, profileId]))
                }
            } catch (error) {
                console.error("Error fetching profile data: ", error);
            }
        };
        getProfileDetailsToView();
    }, [profileDetails, profileId])

    const archiveProfile = async (profileIds: Set<number>): Promise<void> => {
        try {
            const idsArray = Array.from(profileIds);
            const responses = await Promise.all(
                idsArray.map((id) => deleteRequest(`profiles/${id}`)),
            );
            const allSuccssful = responses.every((res) => res.status === 200);
            if (allSuccssful) {
                navigate("/profiling", { replace: true });
                setMessage("Profile has been archived successfully.");
            }
        } catch (error) {
            console.error("error archiving profile data: ", error);
        }
    }

    // Handle utilities

    const handleOnClose = (): void => {
        navigate(-1);
    }

    const handleEditProfile = (): void => {
        navigate(`/profiling/edit/${profileId}`, { replace: true });
    }

    // Modal utilities

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    }
    return (
        <>
            <h1 className="text-4xl p-1.5 pl-0 mb-2.5">View Profile</h1>
            <div className="flex flex-col items-center w-full">
                <div className="p-4 w-full max-w-screen-md">
                    <h2 className="text-2xl">Personal Information</h2>
                    <div className="flex justify-start flex-wrap gap-x-8 mb-3">
                        <div className="form-control w-2/5 flex-none">
                            <div className="label">
                                <span className="label-text">Full Name</span>
                            </div>
                            <div className="px-1 text-lg font-medium">{`${profileDetails?.firstName} ${profileDetails?.middleName} ${profileDetails?.lastName} ${profileDetails?.suffix}`}</div>
                        </div>
                        <div className="form-control w-1/4 flex-none">
                            <div className="label">
                                <span className="label-text">Age</span>
                            </div>
                            <div className="px-1 text-lg font-medium">{profileDetails?.age}</div>
                        </div>
                        <div className="form-control w-1/4 flex-none">
                            <div className="label">
                                <span className="label-text">Gender</span>
                            </div>
                            <div className="px-1 text-lg font-medium">{profileDetails?.gender}</div>
                        </div>
                        <div className="form-control w-2/5 flex-none">
                            <div className="label">
                                <span className="label-text">Date of Birth</span>
                            </div>
                            <div className="px-1 text-lg font-medium">{profileDetails?.dateOfBirth}</div>
                        </div>
                        <div className="form-control w-1/4 flex-none">
                            <div className="label">
                                <span className="label-text">Civil Status</span>
                            </div>
                            <div className="px-1 text-lg font-medium">{profileDetails?.maritalStatus}</div>
                        </div>
                    </div>
                    <h2 className="text-2xl">Contact Information</h2>
                    <div className="flex justify-start flex-wrap gap-x-8 mb-3">
                        <div className="form-control w-full flex-none">
                            <div className="label">
                                <span className="label-text">Address</span>
                            </div>
                            <div className="px-1 text-lg font-medium">{profileDetails?.address}</div>
                        </div>
                        <div className="form-control w-2/5 flex-none">
                            <div className="label">
                                <span className="label-text">Mobile Number</span>
                            </div>
                            <div className="px-1 text-lg font-medium">{profileDetails?.mobileNumber}</div>
                        </div>
                        <div className="form-control w-2/5 flex-none">
                            <div className="label">
                                <span className="label-text">Email Address</span>
                            </div>
                            <div className="px-1 text-lg font-medium">{profileDetails?.emailAddress}</div>
                        </div>
                    </div>
                    <h2 className="text-2xl">Background Information</h2>
                    <div className="flex justify-start flex-wrap gap-x-8 mb-3">
                        <div className="form-control w-2/5 flex-none">
                            <div className="label">
                                <span className="label-text">Educational Background</span>
                            </div>
                            <div className="px-1 text-lg font-medium">{profileDetails?.educationalBackground}</div>
                        </div>
                        <div className="form-control w-2/5 flex-none">
                            <div className="label">
                                <span className="label-text">Occupation</span>
                            </div>
                            <div className="px-1 text-lg font-medium">{profileDetails?.occupation}</div>
                        </div>
                    </div>
                    <div className="flex flex-row-reverse gap-x-1 5 py-1 5">
                        {profileDetails && (
                            <>
                                <button className="btn btn-sm btn-primary rounded-none"
                                    onClick={handleEditProfile}>Edit Profile</button>
                                <button className="btn btn-sm btn-error rounded-none" onClick={() => openModal()}>Archive Profile</button>
                            </>
                        )
                        }
                        <button className="btn btn-ghost btn-sm rounded-none" onClick={handleOnClose}>Close</button>
                    </div>
                    <Dialog
                        isOpen={isOpen}
                        closeModal={closeModal}
                        titleText="Confirm Archive"
                        bodyMessage="Permanently archive"
                        selectedIds={selectedIds}
                        entity="profile"
                        onPerformAction={() => archiveProfile(selectedIds)}
                    />
                </div>
            </div>
        </>
    );
}

export default ViewProfile;