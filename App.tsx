import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, ActivityIndicator } from "react-native";
import AuthNavigator from "./src/navigation/AuthNavigator";
import MainTabs from "./src/navigation/MainTabs";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        setIsLoggedIn(!!user); // Преобразуем в boolean
      } catch (error) {
        console.error("Ошибка при загрузке данных авторизации", error);
      }
    };

    checkLogin();
  }, []);

  if (isLoggedIn === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Загрузка...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainTabs /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default App;
