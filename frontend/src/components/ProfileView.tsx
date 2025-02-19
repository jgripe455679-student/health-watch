import React from "react";
import { useAppUtility } from "../hooks/useAppUtility";
import { Profile } from "../pages/Profiling";

type ProfileViewProps = {
  setCurrentProfilingView: (view: string) => void;
  profileDetails: Profile | null;
  resetEditingState: () => void;
};

const ProfileView: React.FC<ProfileViewProps> = ({
  setCurrentProfilingView,
  profileDetails,
  resetEditingState,
}) => {
  const { formatLocalDateTime } = useAppUtility();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setCurrentProfilingView("profiling");
    resetEditingState();
  };
  return (
    <div className="flex flex-col items-center justify-center gap-y-2 w-full p-1.5 md:py-3 md:px-3 lg:px-6">
      <div className="relative w-11/12 lg:w-4/5 flex justify-start">
        <a
          href="#"
          className="italic text-primary text-xs md:text-sm lg:text-base hover:underline"
          onClick={handleClick}
        >
          Go Back
        </a>
      </div>
      <div className="relative w-11/12 lg:w-4/5 bg-gray-200 p-1.5 md:p-3 lg:p-6">
        <div className="grid grid-cols-7 gap-x-4 gap-y-2 text-xs md:text-sm lg:text-base">
          <div className="col-span-2 flex justify-end items-start">
            <span className="text-right">First Name:</span>
          </div>
          <div className="font-semibold col-span-5 flex items-end">
            {profileDetails?.firstName}
          </div>
          <div className="col-span-2 flex justify-end items-start">
            <span className="text-right">Middle Name:</span>
          </div>
          <div className="font-semibold col-span-5 flex items-end">
            {profileDetails?.middleName}
          </div>
          <div className="col-span-2 flex justify-end items-start">
            <span className="text-right">Last Name:</span>
          </div>
          <div className="font-semibold col-span-5 flex items-end">
            {profileDetails?.lastName}
          </div>
          <div className="col-span-2 flex justify-end items-start">
            <span className="text-right">Suffix:</span>
          </div>
          <div className="font-semibold col-span-5 flex items-end">
            {profileDetails?.suffix}
          </div>
          <div className="col-span-2 flex justify-end items-start">
            <span className="text-right">Date of Birth:</span>
          </div>
          <div className="font-semibold col-span-5 flex items-end">
            {profileDetails?.dateOfBirth}
          </div>
          <div className="col-span-2 flex justify-end items-start">
            <span className="text-right">Gender:</span>
          </div>
          <div className="font-semibold col-span-5 flex items-end">
            {profileDetails?.gender}
          </div>
          <div className="col-span-2 flex justify-end items-start">
            <span className="text-right">Civil Status:</span>
          </div>
          <div className="font-semibold col-span-5 flex items-end">
            {profileDetails?.maritalStatus}
          </div>
          <div className="col-span-2 flex justify-end items-start">
            <span className="text-right">Address:</span>
          </div>
          <div className="font-semibold col-span-5 flex items-end">
            {profileDetails?.address}
          </div>
          <div className="col-span-2 flex justify-end items-start">
            <span className="text-right">Mobile Number:</span>
          </div>
          <div className="font-semibold col-span-5 flex items-end">
            {profileDetails?.mobileNumber}
          </div>
          <div className="col-span-2 flex justify-end items-start">
            <span className="text-right">Occupation:</span>
          </div>
          <div className="font-semibold col-span-5 flex items-end">
            {profileDetails?.occupation}
          </div>
          <div className="col-span-2 flex justify-end items-start">
            <span className="text-right">Educational Attainment:</span>
          </div>
          <div className="font-semibold col-span-5 flex items-end">
            {profileDetails?.educationalBackground}
          </div>
          <div className="col-span-2 flex justify-end items-start">
            <span className="text-right">Household Size:</span>
          </div>
          <div className="font-semibold col-span-5 flex items-end">
            {profileDetails?.householdSize}
          </div>
          <div className="col-span-2 flex justify-end items-start">
            <span className="text-right">Household Income Bracket:</span>
          </div>
          <div className="font-semibold col-span-5 flex items-end">
            {profileDetails?.incomeBracket}
          </div>
          <hr className="col-span-7 my-4 border-t-2 border-dashed border-gray-800" />
          <div className="col-span-2 flex justify-end items-start">
            <span className="text-right">Records:</span>
          </div>
          <div className="font-semibold col-span-5 flex items-end">
            {profileDetails?.records && profileDetails.records.length > 0 ? (
              <ul>
                {profileDetails.records
                  .slice()
                  .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
                  .map((record, index) => (
                    <li key={index}>{record}</li>
                  ))}
              </ul>
            ) : (
              <span>No Record</span>
            )}
          </div>
          <hr className="col-span-7 my-4 border-t-2 border-dashed border-gray-800" />
          <div className="col-span-2 flex justify-end items-start">
            <span className="text-right">Created At:</span>
          </div>
          <div className="font-semibold col-span-5 flex items-end">
            {profileDetails?.createdAt
              ? formatLocalDateTime(profileDetails.createdAt)
              : ""}
          </div>
          <div className="col-span-2 flex justify-end items-start">
            <span className="text-right">Created By:</span>
          </div>
          <div className="font-semibold col-span-5 flex items-end">
            {profileDetails?.createdBy}
          </div>
          <div className="col-span-2 flex justify-end items-start">
            <span className="text-right">Updated At:</span>
          </div>
          <div className="font-semibold col-span-5 flex items-end">
            {profileDetails?.updatedAt
              ? formatLocalDateTime(profileDetails.updatedAt)
              : ""}
          </div>
          <div className="col-span-2 flex justify-end items-start">
            <span className="text-right">Updated By:</span>
          </div>
          <div className="font-semibold col-span-5 flex items-end">
            {profileDetails?.updatedBy}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
