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
import React, { FC, useContext, useEffect, useState } from "react";
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
} from "@heroicons/react/24/solid";
import { BellIcon } from "@heroicons/react/24/outline";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { AuthContext } from "./AuthContext";
import { AuthContextType } from "../@types/auth";

// Profile Menu List []
const profileMenuItems = [
    {
        name: "profile",
        label: "My Profile",
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
    const [currentPage, setCurrentPage] = useState<string>("");
    const handleOnSelectedPage = (value: string) => {
        setCurrentPage(value);
        sessionStorage.setItem("page", value);
    }
    useEffect(() => {
        const getSelectedPage = () => {
            const page = sessionStorage.getItem("page");
            if (page) setCurrentPage(page);
        }
        getSelectedPage();
    }, [])

    // Profile Menu Functional Component
    const ProfileMenu: FC = () => {
        const navigate = useNavigate();
        const { updateAuthStatus } = useContext(AuthContext) as AuthContextType;
        const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
        const handleOnClick = (event: React.MouseEvent) => {
            setIsMenuOpen(false);
            const { target } = event;
            if (target) {
                if ((target as HTMLButtonElement).name === "logout") {
                    localStorage.removeItem("token");
                    sessionStorage.clear();
                    updateAuthStatus();
                    navigate("login", { replace: true })
                }
            }
        }

        return (
            <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
                <MenuHandler>
                    <Button
                        variant="text"
                        color="blue-gray"
                        className="flex items-center gap-1 rounded-full py-2 pr-4 pl-4 tablet:ml-auto"
                    >
                        <UserCircleIcon className="h-6 w-6" />
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
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
                                className={`flex items-center gap-2 rounded ${isLastItem
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
    }

    const LeftNav: FC = () => {
        return (
            <div className="flex-none flex items-center gap-2 w-48 tablet:gap-4">
                <IconButton
                    className="rounded-full"
                    size="md"
                    variant="text"
                >
                    <Bars3Icon className="h-6 w-6 stroke-2" />
                </IconButton>
                <Typography
                    as="a"
                    href="#"
                    className="mr-4 cursor-pointer py-1.5 font-medium"
                >
                    Health Watch
                </Typography>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-12 grid-rows-12 w-full min-h-screen">
            <Navbar className="rounded-none bg-white shadow-xl shadow-blue-gray-700/5 max-w-full px-2 col-span-12 row-span-1 tablet:mx-auto tablet:px-4 tablet:py-2">
                <div className="container mx-0 text-blue-gray-700 flex items-center justify-between tablet:mx-auto">
                    <LeftNav />
                    <div className="flex items-center">
                        <IconButton
                            variant="text"
                            className="rounded-full tablet:mr-3"
                            size="md"
                        >
                            <BellIcon className="h-6 w-6 stroke-2" />
                        </IconButton>
                        <ProfileMenu />
                    </div>
                </div>
            </Navbar>
            <Card className="min-h-screen w-full overflow-hidden rounded-none bg-white shadow-xl shadow-blue-gray-700/5 col-span-2 row-span-11">
                <List className="my-3 p-0">
                    {sidebarMenuItems.map(({ label, icon }) => {
                        const link = `${label}`;
                        return (
                            <NavLink key={label} to={link} >
                                <ListItem selected={currentPage === label} onClick={() => handleOnSelectedPage(label)} className="group rounded-none text-sm font-normal capitalize text-blue-gray-700 py-3 px-2 tablet:py-3 tablet:px-4 hover:bg-blue-gray-50/50">
                                    <ListItemPrefix>
                                        {icon}
                                    </ListItemPrefix>
                                    {label}
                                </ListItem>
                            </NavLink>
                        );
                    })}
                </List>
            </Card>
            <div className="col-span-10 row-span-10">
                <Outlet />
            </div>
        </div >
    );
}

export default MainLayout;