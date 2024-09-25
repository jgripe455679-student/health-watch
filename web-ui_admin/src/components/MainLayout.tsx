import {
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Navbar,
  Typography,
  Card,
  List,
  ListItemPrefix,
  ListItem,
} from "@material-tailwind/react";
import React, { FC, useEffect, useState } from "react";
import {
  LifebuoyIcon,
  UserCircleIcon,
  PowerIcon,
  ChevronDownIcon,
  PresentationChartBarIcon,
  FolderOpenIcon,
  ChartBarIcon,
  UserGroupIcon,
  MegaphoneIcon,
  ChatBubbleBottomCenterIcon,
  BellIcon,
} from "@heroicons/react/24/solid";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { ACCESS_KEY, AUTH_KEY, REFRESH_KEY } from "../lib/client";
import useAuth from "../hooks/useAuth";

// Profile Menu List []
const profileMenuItems = [
  {
    name: "profile",
    label: "Profile",
    icon: UserCircleIcon,
  },
  {
    name: "help",
    label: "Help",
    icon: LifebuoyIcon,
  },
  {
    name: "logout",
    label: "Log Out",
    icon: PowerIcon,
  },
];

// Sidebar Menu Items
const sidebarMenuItems = [
  {
    label: "dashboard",
    icon: <PresentationChartBarIcon className="h-5 w-5" />,
  },
  {
    label: "reports",
    icon: <FolderOpenIcon className="h-5 w-5" />,
  },
  {
    label: "analytics",
    icon: <ChartBarIcon className="h-5 w-5" />,
  },
  {
    label: "announcements",
    icon: <MegaphoneIcon className="h-5 w-5" />,
  },
  {
    label: "messages",
    icon: <ChatBubbleBottomCenterIcon className="h-5 w-5" />,
  },
  {
    label: "users",
    icon: <UserGroupIcon className="h-5 w-5" />,
  },
];

const MainLayout: FC = () => {
  const [currentPath, setCurrentPath] = useState<string>("");
  const { auth, setAuth } = useAuth();

  const handleOnSelectedPath = (value: string) => {
    if (value) {
      setCurrentPath(value);
      setAuth({ ...auth, currentPath: value });
    }
  };

  useEffect(() => {
    const getCurrentPath = () => {
      const path = auth.currentPath;
      if (path === "") {
        setCurrentPath(auth.defaultPath);
      } else {
        setCurrentPath(path);
      }
    };
    getCurrentPath();
  }, []);

  useEffect(() => {
    const storeUpdatedAuth = () => {
      localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
    };
    storeUpdatedAuth();
  }, [currentPath]);

  // Profile Menu Functional Component
  const ProfileMenu: FC = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const handleOnClick = (event: React.MouseEvent) => {
      setIsMenuOpen(false);
      const { target } = event;
      if (target) {
        if ((target as HTMLButtonElement).name === "logout") {
          localStorage.removeItem(REFRESH_KEY);
          localStorage.removeItem(ACCESS_KEY);
          localStorage.removeItem(AUTH_KEY);
          setAuth({ ...auth, isLoggedIn: !auth.isLoggedIn, currentPath: "" });
          navigate("/login", { replace: true });
        }
      }
    };

    return (
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            className="flex items-center gap-1 rounded-full hover:bg-blue-gray-50 py-2 pr-4 pl-4"
          >
            <UserCircleIcon className="h-6 w-6 stroke-2 text-blue-gray-700" />
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
        <MenuList className="p-1">
          {profileMenuItems.map(({ name, label, icon }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <MenuItem
                key={label}
                name={name}
                onClick={handleOnClick}
                className={`flex items-center gap-2 rounded text-blue-gray-700 hover:bg-blue-gray-50 ${
                  isLastItem
                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                    : ""
                }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? "red" : "inherit"}
                >
                  {label}
                </Typography>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    );
  };

  return (
    <>
      <Navbar className="rounded-none shadow-blue-gray-700/5 max-w-full mx-auto">
        <div className="container mx-0 text-blue-gray-700 flex items-center justify-between">
          <div className="flex-none flex items-center gap-2 w-48">
            <IconButton
              className="rounded-full hover:bg-blue-gray-50"
              size="md"
              variant="text"
            >
              <Bars3Icon className="h-6 w-6 stroke-2 text-blue-gray-700" />
            </IconButton>
            <Typography
              as="a"
              href="#"
              className="mr-2 cursor-pointer py-1.5 font-medium"
            >
              Health Watch
            </Typography>
          </div>
          <div className="flex items-center gap-2">
            <IconButton
              variant="text"
              className="rounded-full ml-2 hover:bg-blue-gray-50"
              size="md"
            >
              <BellIcon className="h-6 w-6 stroke-2 text-blue-gray-700" />
            </IconButton>
            <ProfileMenu />
          </div>
        </div>
      </Navbar>
      <div className="grid grid-cols-[98px_auto] md:grid-cols-[248px_auto]">
        <Card className="overflow-hidden rounded-none min-h-screen bg-white shadow-blue-gray-700/5">
          <List className="text-blue-gray-700 min-w-full md:w-full p-1 md:px-2 md:my-2">
            {sidebarMenuItems.map(({ label, icon }) => {
              const link = `${label}`;
              return (
                <NavLink key={label} to={link}>
                  <ListItem
                    selected={currentPath === label}
                    onClick={() => handleOnSelectedPath(label)}
                    className="group rounded-md text-xs md:text-sm font-normal capitalize text-blue-gray-700 py-3 px-2 hover:bg-blue-gray-100/75 focus:bg-blue-gray-100/75 flex flex-col items-center md:flex-row"
                  >
                    <ListItemPrefix>{icon}</ListItemPrefix>
                    {label}
                  </ListItem>
                </NavLink>
              );
            })}
          </List>
        </Card>
        <div className="bg-blue-gray-50 min-h-screen min-w-full p-2">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
