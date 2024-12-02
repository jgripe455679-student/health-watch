import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export const useLogout = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  setUser({ isAuthenticated: false });
  navigate("/login", { replace: true });
};
