import React from "react";
import Navbar from "../components/Navbar";
import ResetPasswordForm from "../components/ResetPasswordForm";

const ResetPassword: React.FC = () => {
  return (
    <div className="h-full w-full min-h-screen">
      <Navbar />
      <div className="flex flex-col justify-start items-start px-2.5 py-1 my-1.5">
        <span className="text-4xl ml-4 mb-4">Reset Password</span>
        <ResetPasswordForm />
      </div>
    </div>
  )
};

export default ResetPassword;
