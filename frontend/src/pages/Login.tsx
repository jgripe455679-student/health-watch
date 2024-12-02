import { Navigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const { user } = useAuth();
  return user?.isLogged ? (
    <Navigate to="/dashboard" />
  ) : (
    <div className="flex items-center justify-center min-h-screen">
      <LoginForm />
    </div>
  );
}

export default Login;
