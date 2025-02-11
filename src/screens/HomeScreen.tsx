import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { getTracks } from "../services/jamendoApi";

const HomeScreen = () => {
    const [tracks, setTracks] = useState<any[]>([]);

    useEffect(() => {
        const fetchTracks = async () => {
            const data = await getTracks();
            setTracks(data);
        };
        fetchTracks();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Популярные треки</Text>
            <FlatList
                data={tracks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.track}>
                        <Image source={{ uri: item.image }} style={styles.cover} />
                        <View>
                            <Text style={styles.trackTitle}>{item.name}</Text>
                            <Text style={styles.artist}>{item.artist_name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#000", padding: 10 },
    title: { fontSize: 22, fontWeight: "bold", color: "#fff", marginBottom: 10 },
    track: { flexDirection: "row", marginBottom: 10, alignItems: "center" },
    cover: { width: 60, height: 60, borderRadius: 10, marginRight: 10 },
    trackTitle: { color: "#fff", fontSize: 16, fontWeight: "bold" },
    artist: { color: "#888", fontSize: 14 },
});

export default HomeScreen;
