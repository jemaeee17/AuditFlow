import api from "@/lib/axios";

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export const register = async (data: RegisterData) => {
    const response = await api.post("/register", data);
    return response.data;
};

export const login = async (data: LoginData) => {
    const response = await api.post("/login", data);
    return response.data;
};

export const logout = async () => {
    const response = await api.post("/logout");
    return response.data;
};

export const getUser = async () => {
    const response = await api.get("/user");
    return response.data;
};