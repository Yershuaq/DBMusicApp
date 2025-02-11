type User = {
    email: string;
    password: string;
};

const users: User[] = []; // Временная база пользователей

export const registerUser = (email: string, password: string): boolean => {
    const userExists = users.some((user) => user.email === email);
    if (userExists) return false; // Пользователь уже зарегистрирован
    users.push({ email, password });
    return true;
};

export const loginUser = (email: string, password: string): boolean => {
    return users.some((user) => user.email === email && user.password === password);
};
