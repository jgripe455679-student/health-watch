export type AuthContextType = {
    auth: Auth;
    setAuth: (auth: Auth) => void;
}

export type Auth = {
    isLoggedIn: boolean;
    defaultPath: string;
    currentPath: string;
}

export type LoginCredentials = {
    email: string;
    password: string;
}