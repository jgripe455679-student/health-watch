import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4 items-center justify-center min-h-screen max-sm:p-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-24 w-24"
        viewBox="0 0 320 512"
      >
        <path
          fill="#48cfad"
          d="M80 160c0-35.3 28.7-64 64-64l32 0c35.3 0 64 28.7 64 64l0 3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74l0 1.4c0 17.7 14.3 32 32 32s32-14.3 32-32l0-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7l0-3.6c0-70.7-57.3-128-128-128l-32 0C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"
        />
      </svg>
      <span className="max-sm:text-4xl text-7xl">Page Not Found</span>
      <span className="max-sm:text-sm text-base">
        Oops! We couldn't find the page that you're looking for.
      </span>
      <Link to="/" className="btn btn-md btn-primary rounded-none">
        Go home
      </Link>
      <div className="flex flex-row space-x-1">
        <span className="text-xs font-semibold">Error Code:</span>
        <span className="text-xs">404</span>
      </div>
    </div>
  );
};

export default NotFound;
