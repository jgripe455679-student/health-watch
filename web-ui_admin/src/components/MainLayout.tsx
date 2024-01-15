import { IconButton, Input, Navbar, Typography } from "@material-tailwind/react";
import { FC } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Outlet } from "react-router-dom";

const MainLayout: FC = () => {
    const navList = (
        <div className="flex flex-row items-center gap-4">
            <Input variant="outlined" color="blue" placeholder="Search" size="md" icon={<MagnifyingGlassIcon />} />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
        </div>
    );
    return (
        <div className="grid grid-cols-2 auto-rows-max min-h-screen min-w-screen">
            <Navbar className="mx-auto max-w-full rounded-none px-5 py-3 col-span-2 row-span-1">
                <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                    <div className="flex flex-row items-center gap-4">
                        <IconButton
                            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent"
                            variant="text"
                            ripple={false}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </IconButton>
                        <Typography
                            as="a"
                            href="#"
                            className="mr-4 cursor-pointer py-1.5 font-medium"
                        >
                            Health Watch
                        </Typography>
                    </div>
                    <div className="block">{navList}</div>
                </div>
            </Navbar>
            <div className="col-span-1">
                Sidebar
            </div>
            <div className="col-span-1">
                <Outlet />
            </div>
        </div>
    );
}

export default MainLayout;