import React, { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { get, post } from "../api/apiClient";
import { useAuth } from "../hooks/useAuth";

interface MenuItem {
  label: string;
  value: string;
}

interface UserInfo {
  username: string;
  role: string;
  permissions: string[];
}

const Navbar: React.FC = () => {
  const { logout, username, setUsername } = useAuth();
  const navigate = useNavigate();

  const menuItems: MenuItem[] = [
    { label: "Electronic Health Record Form", value: "/health-record" },
    { label: "Profiling", value: "/profiling" },
  ];

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await get("auth/info");
        if (response.status === 200) {
          const { username } = response.data as UserInfo;
          setUsername(username);
        }
      } catch (error) {
        console.error("Error fetching username: ", error);
      }
    };
    fetchUsername();
  }, [setUsername]);

  const handleLogout = async () => {
    try {
      const response = await post("/auth/logout");
      if (response.status === 200) {
        logout();
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.error("Error logging out user ", error);
    }
    // axios
    //   .post(
    //     "http://localhost:8080/api/v1/auth/logout",
    //     {},
    //     { withCredentials: true }
    //   )
    //   .then((res) => {
    //     if (res.status === 200) {
    //       logout();
    //       navigate("/login", { replace: true });
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     if (error.response) {
    //       if (error.response.status === 401) {
    //         axios
    //           .post("http://localhost:8080/api/v1/auth/refresh")
    //           .then((initialResponse) => {
    //             if (initialResponse.status === 200) {
    //               axios
    //                 .get("http://localhost:8080/api/v1/auth/info")
    //                 .then((refreshResponse) => {
    //                   if (refreshResponse.status === 200) {
    //                     axios
    //                       .post(
    //                         "http://localhost:8080/api/v1/auth/logout",
    //                         {},
    //                         { withCredentials: true }
    //                       )
    //                       .then((res) => {
    //                         if (res.status === 200) {
    //                           logout();
    //                           navigate("/login", { replace: true });
    //                         }
    //                       })
    //                       .catch((error) => {
    //                         console.error(error);
    //                       });
    //                   }
    //                 })
    //                 .catch((refreshError) => {
    //                   console.error(refreshError);
    //                 });
    //             }
    //           })
    //           .catch((initialError) => {
    //             console.error(initialError);
    //           });
    //       }
    //     }
    //   });
  };
  return (
    <>
      <div className="navbar bg-primary px-0 md:px-4 lg:px-8">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost ml-0.5 px-1 lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {menuItems.map((item) => (
                <li key={item.value}>
                  <NavLink to={item.value}>{item.label}</NavLink>
                </li>
              ))}
            </ul>
          </div>
          <Link to="/" className="text-xl flex items-center gap-x-1.5">
            <img
              src="/transparent.svg"
              alt="HealthWatch Transparent Logo"
              className="h-8 w-8 md:h-10 md:w-10"
            />
            <span className="text-xs md:text-xl">HealthWatch</span>
          </Link>
        </div>
        <div className="navbar-end">
          <ul className="menu menu-horizontal z-[1] px-1">
            <li>
              <details>
                <summary className="italic text-xs md:text-sm">
                  Hello, {username}
                </summary>
                <ul className="bg-base-200 rounded-t-none p-2">
                  <li>
                    <Link to="/reset-password">Reset Password</Link>
                  </li>
                  <li>
                    <a onClick={handleLogout}>Log Out</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar bg-base-100 px-8 py-0 min-h-0 border-b border-gray-300">
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal p-0">
            {menuItems.map((item) => (
              <li key={item.value}>
                <NavLink to={item.value} className="rounded-none">
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
