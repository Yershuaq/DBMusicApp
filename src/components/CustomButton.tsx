import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { theme } from "../styles/theme";

type Props = {
    title: string;
    onPress: () => void;
};

const CustomButton: React.FC<Props> = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 24,
        alignItems: "center",
    },
    text: {
        color: theme.colors.text,
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default CustomButton;
