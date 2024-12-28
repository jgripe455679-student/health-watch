import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { get } from "../api/apiClient";
import { useAuth } from "../hooks/useAuth";

type NavbarProps = {
  setCurrentProfilingView?: (view: string) => void;
  setCurrentUserManagementView?: (view: string) => void;
};

interface MenuItem {
  label: string;
  value: string;
}

interface UserInfo {
  username: string;
  role: string;
  permissions: string[];
}

const Navbar: React.FC<NavbarProps> = ({
  setCurrentProfilingView,
  setCurrentUserManagementView,
}) => {
  const [activeItem, setActiveItem] = useState<string>("");
  const { logout, username, setUsername } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: MenuItem[] = [
    { label: "Dashboard", value: "/dashboard" },
    { label: "Electronic Health Record System", value: "/health-record" },
    { label: "Profiling", value: "/profiling" },
    { label: "User Management", value: "/user-management" },
  ];

  const handleMenuItemClick = (item: MenuItem) => {
    setActiveItem(item.value);
    if (setCurrentProfilingView) {
      setCurrentProfilingView("profiling");
    }
    if (setCurrentUserManagementView) {
      setCurrentUserManagementView("userManagement");
    }
  };

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await get("auth/info");
        if (response.status === 200) {
          const { username } = response.data as UserInfo;
          setUsername(username);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchUsername();
  }, [setUsername]);

  const handleLogout = () => {
    axios
      .post(
        "http://localhost:8080/api/v1/auth/logout",
        {},
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          logout();
          navigate("/login", { replace: true });
        }
      })
      .catch((error) => {
        console.error(error);
        if (error.response) {
          if (error.respose.status === 401) {
            axios
              .get("http://localhost:8080/api/v1/auth/info")
              .then((refreshResponse) => {
                if (refreshResponse.status === 200) {
                  axios
                    .post(
                      "http://localhost:8080/api/v1/auth/logout",
                      {},
                      { withCredentials: true }
                    )
                    .then((res) => {
                      if (res.status === 200) {
                        logout();
                        navigate("/login", { replace: true });
                      }
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                }
              })
              .catch((refreshError) => {
                console.error(refreshError);
              });
          }
        }
      });
  };
  return (
    <>
      <div className="navbar bg-primary px-8">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {menuItems.map((item) => (
                <li key={item.value} onClick={() => handleMenuItemClick(item)}>
                  <Link
                    to={item.value}
                    className={activeItem === item.value ? "active" : ""}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link to="/" className="text-xl flex items-center gap-x-1.5">
            <img src="/transparent.svg" alt="HealthWatch Transparent Logo" className="h-10 w-10" />
            HealthWatch Admin
          </Link>
        </div>
        <div className="navbar-end">
          <ul className="menu menu-horizontal z-[1] px-1">
            <li>
              <details>
                <summary className="italic">Hello, {username}</summary>
                <ul className="bg-base-200 rounded-t-none p-2">
                  <li>
                    <a>Reset password</a>
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
          <ul className="menu menu-horizontal px-1 py-0">
            {menuItems.map((item) => (
              <li key={item.value} onClick={() => handleMenuItemClick(item)}>
                <Link
                  to={item.value}
                  className={
                    activeItem === item.value
                      ? "rounded-none active"
                      : "rounded-none"
                  }
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
