import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return(
        <div className="relative desktop:h-4/5 desktop:w-96  desktop:shadow-2xl bg-white desktop:rounded-md grid grid-cols-1 content-center place-items-center desktop:p-4 laptop:h-4/5 laptop:w-2/5 laptop:shadow-2xl laptop:rounded-md laptop:p-3 tablet:w-3/4 tablet:h-4/5 tablet:rounded-md tablet:shadow-2xl tablet:p-4 phone:h-screen phone:w-screen">
            <Outlet />
        </div>
    );
}

export default AuthLayout;