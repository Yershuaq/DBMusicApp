import AsyncStorage from "@react-native-async-storage/async-storage";

const USERS_KEY = "users";

export const registerUser = async (email: string, password: string) => {
    const usersJson = await AsyncStorage.getItem(USERS_KEY);
    const users = usersJson ? JSON.parse(usersJson) : [];

    if (users.some((user: any) => user.email === email)) {
        throw new Error("Пользователь уже существует");
    }

    users.push({ email, password });
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const loginUser = async (email: string, password: string) => {
    const usersJson = await AsyncStorage.getItem(USERS_KEY);
    const users = usersJson ? JSON.parse(usersJson) : [];

    const user = users.find((user: any) => user.email === email && user.password === password);
    if (!user) throw new Error("Неверный email или пароль");

    await AsyncStorage.setItem("userToken", email); // Запоминаем вход
};

export const logoutUser = async () => {
    await AsyncStorage.removeItem("userToken");
};

export const isLoggedIn = async (): Promise<boolean> => {
    const token = await AsyncStorage.getItem("userToken");
    return !!token;
};
