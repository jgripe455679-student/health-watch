import { FC, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute: FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const navigate = useNavigate();
    useEffect(() => {
        const isUserLoggedIn = () => {
            const token = JSON.parse(localStorage.getItem("tokens") || "{}");
            if (token.access) {
                setIsLoggedIn(!isLoggedIn);
            } else {
                navigate("/login", { replace: true });
            }
        }
        isUserLoggedIn();
    }, []);

    return (
        <Outlet />
    );
}

export default ProtectedRoute;