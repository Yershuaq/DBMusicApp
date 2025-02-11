import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { theme } from "../styles/theme";

type Props = {
    title: string;
    artist: string;
    imageUrl: string;
};

const TrackCard: React.FC<Props> = ({ title, artist, imageUrl }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.artist}>{artist}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        backgroundColor: theme.colors.card,
        padding: theme.spacing.small,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: theme.spacing.small,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 4,
        marginRight: theme.spacing.small,
    },
    title: {
        color: theme.colors.text,
        fontSize: 16,
        fontWeight: "bold",
    },
    artist: {
        color: theme.colors.secondaryText,
        fontSize: 14,
    },
});

export default TrackCard;
