import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import AppUtilityProvider from "../utils/AppUtilityProvider";
import AuthProvider from "../utils/AuthProvider";

describe("Login Form Component", () => {
  it("renders the login form with the correct heading", () => {
    render(
      <BrowserRouter>
        <AppUtilityProvider>
          <AuthProvider>
            <LoginForm />
          </AuthProvider>
        </AppUtilityProvider>
      </BrowserRouter>,
    );
    expect(screen.getByText("HealthWatch Admin")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });
});
