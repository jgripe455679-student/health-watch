import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import AuthProvider from "../utils/AuthProvider";

describe("Login Form Component", () => {
  it("renders the login form with the correct heading", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <LoginForm />
        </AuthProvider>
      </BrowserRouter>
    );
    expect(
      screen.getByRole("heading", {
        level: 6,
      })
    ).toHaveTextContent("HealthWatch Admin");
  });
});
