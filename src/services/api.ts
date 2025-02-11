import axios from "axios";

const API_URL = "http://192.168.1.100:5000"; // ЗАМЕНИ НА СВОЙ IP + порт бэкенда!

export const login = async (email: string, password: string) => {
    return await axios.post(`${API_URL}/login`, { email, password });
};

export const register = async (email: string, password: string) => {
    return await axios.post(`${API_URL}/register`, { email, password });
};

export const getUserProfile = async (token: string) => {
    return await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
