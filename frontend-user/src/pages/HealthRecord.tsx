import React from "react";
import HealthRecordForm from "../components/HealthRecordForm";
import Navbar from "../components/Navbar";
import useDocumentTitle from "../hooks/useDocumentTitle";

export type ProfileType = {
  name: string;
};

const profileTypes: ProfileType[] = [{ name: "OLD" }, { name: "NEW" }];

const HealthRecord: React.FC = () => {
  useDocumentTitle("Electronic Health Record Form");
  return (
    <div className="h-full w-full min-h-screen">
      <Navbar />
      <div className="px-1.5 md:px-2.5 py-1 my-1.5">
        <div className="card card-bordered bg-base-100 border-gray-300 rounded-none shadow">
          <div className="card-body p-0">
            <span className="card-title bg-gray-100 text-md text-primary p-1.5">
              New Record
            </span>
            <HealthRecordForm
            profileTypes={profileTypes}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthRecord;
