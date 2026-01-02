import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const ProfilingLayout: React.FC = () => {
  return (
    <div className="h-full w-full">
      <Navbar />
      <div className="relative px-1.5 md:px-2.5 py-1 my-1.5">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfilingLayout;
