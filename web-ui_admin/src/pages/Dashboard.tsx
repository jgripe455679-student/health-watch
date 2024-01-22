import { FC, useContext, useEffect } from "react";
import { AuthContext } from "../components/AuthContext";
import { AuthContextType } from "../@types/auth";

const Dashboard: FC = () => {
    const { authStatus } = useContext(AuthContext) as AuthContextType;
    useEffect(() => {
        sessionStorage.setItem("page", "dashboard");
        console.log(authStatus);
    }, [])
    return(
        <div>
        Hello, world!
        </div>
    );
}

export default Dashboard;
