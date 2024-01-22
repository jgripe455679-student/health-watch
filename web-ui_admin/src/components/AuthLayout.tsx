import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { Card } from "@material-tailwind/react";

const AuthLayout = (): ReactElement => {
    return (
        <div className="min-h-screen min-w-screen grid grid-cols-1 place-items-center">
            <Card className="w-full h-full tablet:max-w-96 tablet:max-h-96">
                <Outlet />
            </Card>
        </div>
    );
}

export default AuthLayout;