import { FC, useEffect } from "react";

const Users: FC = () => {
    useEffect(() => {
        sessionStorage.setItem("page", "users");
    }, []);
    return (
        <div className="p-0">
            Users
        </div>
    );
}

export default Users;