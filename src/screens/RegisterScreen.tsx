import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

type RootStackParamList = {
    Register: undefined;
    Login: undefined;
};

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Register">;
type RegisterScreenRouteProp = RouteProp<RootStackParamList, "Register">;

interface Props {
    navigation: RegisterScreenNavigationProp;
    route: RegisterScreenRouteProp;
}

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        if (!email || !password) {
            Alert.alert("Ошибка", "Введите email и пароль!");
            return;
        }

        await AsyncStorage.setItem("user", JSON.stringify({ email, password }));
        Alert.alert("Успех", "Аккаунт создан!");
        navigation.replace("Login"); // ✅ Теперь replace работает!
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Регистрация</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
            />
            <TextInput
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <TouchableOpacity onPress={handleRegister} style={styles.button}>
                <Text style={styles.buttonText}>Зарегистрироваться</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.linkButton}>
                <Text style={styles.linkText}>Уже есть аккаунт? Войти</Text>
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

export default RegisterScreen;
