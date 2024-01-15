import { FC } from "react";
import { Outlet } from "react-router-dom";

const AuthLayout: FC = () => {
    return (
        <div className="min-h-screen min-w-screen grid grid-cols-1 place-items-center">
            <div className="desktop:h-96 desktop:w-96 laptop:h-96 laptop:w-96 tablet:w-96 tablet:h-96 phone:w-full phone:h-full">
                <Outlet />
            </div>
        </div>
    );
}

export default AuthLayout;