import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProfileScreen = () => (
    <View style={styles.container}>
        <Text style={styles.text}>Профиль пользователя</Text>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#121212" },
    text: { color: "#fff", fontSize: 20 },
});

export default ProfileScreen;
