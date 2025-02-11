import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { theme } from "../styles/theme";

const MiniPlayer = () => {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: "https://via.placeholder.com/50" }}
                style={styles.image}
            />
            <Text style={styles.text}>Now Playing...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.colors.card,
        padding: theme.spacing.medium,
        flexDirection: "row",
        alignItems: "center",
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 4,
        marginRight: theme.spacing.small,
    },
    text: {
        color: theme.colors.text,
        fontSize: 14,
    },
});

export default MiniPlayer;
