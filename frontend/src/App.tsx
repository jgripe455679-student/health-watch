import { Outlet } from "react-router-dom";

export default function App() {
    return (
        <div className="grid place-items-center min-h-screen">
            <Outlet />
        </div>
    );
}