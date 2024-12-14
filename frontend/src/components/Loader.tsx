import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Loader: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Wait for 1 second (1000 milliseconds)

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
          <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (user?.isLogged) {
    return <Navigate to="/dashboard" />;
  }

  if (!user?.isLogged) {
    return <Navigate to="/login" />;
  }

  return null;
};

export default Loader;
