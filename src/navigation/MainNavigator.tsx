import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import PlaylistScreen from "../screens/PlaylistScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === "Главная") iconName = "home";
                    else if (route.name === "Поиск") iconName = "search";
                    else if (route.name === "Мои плейлисты") iconName = "musical-notes";
                    else if (route.name === "Профиль") iconName = "person";

                    return <Ionicons name={iconName as any} size={size} color={color} />;
                },
                tabBarStyle: { backgroundColor: "#121212", borderTopWidth: 0 },
                tabBarActiveTintColor: "#1DB954",
                tabBarInactiveTintColor: "#888",
            })}
        >
            <Tab.Screen name="Главная" component={HomeScreen} />
            <Tab.Screen name="Поиск" component={SearchScreen} />
            <Tab.Screen name="Мои плейлисты" component={PlaylistScreen} />
            <Tab.Screen name="Профиль" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default MainNavigator;
