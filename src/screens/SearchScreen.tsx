import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, FlatList, Text, StyleSheet } from "react-native";

// Определяем интерфейс для треков
interface MusicTrack {
    id: string;
    audio: string;
    name: string;
    artist_name: string;
}

const SearchScreen = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState<MusicTrack[]>([]);

    const searchMusic = async () => {
        if (!searchQuery.trim()) return;

        try {
            const response = await fetch(
                `https://api.jamendo.com/v3.0/tracks/?client_id=09c4eecf&format=json&search=${searchQuery}`
            );
            const data = await response.json();
            setResults(data.results || []);
        } catch (error) {
            console.error("Ошибка поиска:", error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Поиск музыки..."
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <TouchableOpacity onPress={searchMusic} style={styles.button}>
                <Text style={styles.buttonText}>Искать</Text>
            </TouchableOpacity>

            <FlatList
                data={results}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.trackItem}>
                        <Text style={styles.trackTitle}>{item.name}</Text>
                        <Text style={styles.artist}>{item.artist_name}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#000" },
    input: { backgroundColor: "#222", padding: 10, borderRadius: 5, color: "#fff", marginBottom: 10 },
    button: { backgroundColor: "#1DB954", padding: 15, borderRadius: 5, alignItems: "center", marginBottom: 10 },
    buttonText: { color: "#fff", fontSize: 16 },
    trackItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#555" },
    trackTitle: { color: "#fff", fontSize: 16 },
    artist: { color: "#888" },
});

export default SearchScreen;
