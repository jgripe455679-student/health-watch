import React from "react";
import { useAppUtility } from "../hooks/useAppUtility";
import { Record } from "../pages/HealthRecord";
import { Profile } from "../pages/profiling/Profiling";

type HealthRecordViewProps = {
  setCurrentHealthRecordView: (view: string) => void;
  recordDetails: Record | null;
  profileDetails: Profile | null;
  resetEditingState: () => void;
};

const HealthRecordView: React.FC<HealthRecordViewProps> = ({
  setCurrentHealthRecordView,
  recordDetails,
  profileDetails,
  resetEditingState,
}) => {
  const { formatLocalDateTime } = useAppUtility();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setCurrentHealthRecordView("EHRs");
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
            <span className="text-right">Record Date:</span>
          </div>
          <div className="font-semibold col-span-5 flex items-end">
            {recordDetails?.recordDate}
          </div>
          <div className="col-span-2 flex justify-end items-start">
            <span className="text-right">Profile Type:</span>
          </div>
          <div className="font-semibold col-span-5 flex items-end">
            {recordDetails?.profileType}
          </div>
          <div className="col-span-2 flex justify-end items-start">
            <span className="text-right">Department:</span>
          </div>
          <div className="font-semibold col-span-5 flex items-end">
            {recordDetails?.department}
          </div>
          <hr className="col-span-7 my-4 border-t-2 border-dashed border-gray-800" />
          <div className="col-span-2 flex justify-end items-start">
            <span className="text-right">Name:</span>
          </div>
          <div className="font-semibold col-span-5 flex items-end">
            {recordDetails?.profile}
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
          <hr className="col-span-7 my-4 border-t-2 border-dashed border-gray-800" />
          <div className="col-span-2 flex justify-end items-start">
            <span className="text-right">Height:</span>
          </div>
          <div className="font-semibold col-span-5 flex items-end">
            {recordDetails?.height}
          </div>
          <div className="col-span-2 flex justify-end items-start">
            <span className="text-right">Weight:</span>
          </div>
          <div className="font-semibold col-span-5 flex items-end">
            {recordDetails?.weight}
          </div>
          <div className="col-span-2 flex justify-end items-start">
            <span className="text-right">Blood Pressure:</span>
          </div>
          <div className="font-semibold col-span-5 flex items-end">
            {recordDetails?.bloodPressure}
          </div>
          <hr className="col-span-7 my-4 border-t-2 border-dashed border-gray-800" />
          <div className="col-span-2 flex justify-end items-start">
            <span className="text-right">Created At:</span>
          </div>
          <div className="font-semibold col-span-5 flex items-end">
            {recordDetails?.createdAt
              ? formatLocalDateTime(recordDetails.createdAt)
              : ""}
          </div>
          <div className="col-span-2 flex justify-end items-start">
            <span className="text-right">Created By:</span>
          </div>
          <div className="font-semibold col-span-5 flex items-end">
            {recordDetails?.createdBy}
          </div>
          <div className="col-span-2 flex justify-end items-start">
            <span className="text-right">Updated At:</span>
          </div>
          <div className="font-semibold col-span-5 flex items-end">
            {recordDetails?.updatedAt
              ? formatLocalDateTime(recordDetails.updatedAt)
              : ""}
          </div>
          <div className="col-span-2 flex justify-end items-start">
            <span className="text-right">Updated At:</span>
          </div>
          <div className="font-semibold col-span-5 flex items-end">
            {recordDetails?.updatedBy}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthRecordView;
