import React from "react";
import Navbar from "../components/Navbar";
import useDocumentTitle from "../hooks/useDocumentTitle";

const Dashboard: React.FC = () => {
  useDocumentTitle("Dashboard");
  return (
    <div className="h-full w-full">
      <Navbar />
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
