import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Main: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;
type LoginScreenRouteProp = RouteProp<RootStackParamList, "Login">;

interface Props {
    navigation: LoginScreenNavigationProp;
    route: LoginScreenRouteProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const storedUser = await AsyncStorage.getItem("user");
        if (!storedUser) return Alert.alert("Ошибка", "Пользователь не найден!");

        const user = JSON.parse(storedUser);
        if (user.email === email && user.password === password) {
            navigation.replace("Main"); // ✅ ТЕПЕРЬ navigation.replace РАБОТАЕТ!
        } else {
            Alert.alert("Ошибка", "Неверные данные!");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Вход</Text>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
            <TextInput placeholder="Пароль" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Войти</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Register")} style={styles.linkButton}>
                <Text style={styles.linkText}>Нет аккаунта? Зарегистрироваться</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" },
    title: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 20 },
    input: { width: "80%", padding: 10, backgroundColor: "#222", color: "#fff", borderRadius: 5, marginBottom: 10 },
    button: { backgroundColor: "#1DB954", padding: 15, borderRadius: 5, width: "80%", alignItems: "center" },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
    linkButton: { marginTop: 10 },
    linkText: { color: "#1DB954", fontSize: 14 },
});

export default LoginScreen;
