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
        <img
          src="/transparent.svg"
          alt="HealthWatch Transparent Logo"
          className="h-24 w-24"
        />
      </div>
    );
  }

  if (user?.isLogged) {
    return <Navigate to="/health-record" />;
  }

  if (!user?.isLogged) {
    return <Navigate to="/login" />;
  }

  return null;
};

export default Loader;
