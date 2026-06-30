"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";

import { getUser, login as loginService, logout as logoutService, register as registerService } from "@/services/auth.service";
import { getToken, setToken, removeToken } from "@/lib/auth";
import { useRouter } from "next/navigation";


interface User {
    id: number;
    name: string;
    email: string;
}

interface LoginData {
    email: string;
    password: string;
}

interface RegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;

    login: (data: LoginData) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const initialize = async () => {
            const token = getToken();

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const user = await getUser();
                setUser(user);
            } catch {
                removeToken();
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        initialize();
    }, []);

    const login = async (data: LoginData) => {
        const response = await loginService(data);

        setToken(response.token);

        const user = await getUser();

        setUser(user);
    };

    const register = async (data: RegisterData) => {
        const response = await registerService(data);

        setToken(response.token);

        const user = await getUser();

        setUser(user);
    };

    const logout = async () => {
        try {
            await logoutService();
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            removeToken();
            setUser(null);
            router.replace("/login");
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated: !!user,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider.");
    }

    return context;
}