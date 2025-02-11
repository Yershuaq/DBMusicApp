import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import PlaylistScreen from "../screens/PlaylistScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const MainTabs = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: { backgroundColor: "#000" },
            tabBarIcon: ({ color, size }) => {
                let iconName;
                if (route.name === "Home") iconName = "home";
                else if (route.name === "Search") iconName = "search";
                else if (route.name === "Playlist") iconName = "musical-notes";
                else if (route.name === "Profile") iconName = "person";
                return <Ionicons name={iconName as any} size={size} color={color} />;
            },
        })}
    >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Playlist" component={PlaylistScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
);

export default MainTabs;
