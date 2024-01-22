export type AuthContextType = {
    authStatus: boolean;
    updateAuthStatus: () => void;
}

export type LoginCredentials = {
    email: string;
    password: string;
}