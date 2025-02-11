import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import TrackPlayer, { Capability, State, usePlaybackState, Track } from "react-native-track-player";

// Определяем интерфейс для трека
interface MusicTrack {
    id: string;
    audio: string;
    name: string;
    artist_name: string;
}

const PlaylistScreen = () => {
    const [playlist, setPlaylist] = useState<MusicTrack[]>([]);
    const playbackState = usePlaybackState() as { state?: State }; // Исправляем тип ошибки

    useEffect(() => {
        const setupPlayer = async () => {
            await TrackPlayer.setupPlayer();
            await TrackPlayer.updateOptions({
                capabilities: [Capability.Play, Capability.Pause, Capability.SkipToNext, Capability.SkipToPrevious],
            });
        };
        setupPlayer();
    }, []);

    const loadPlaylist = async () => {
        try {
            const response = await fetch(`https://api.jamendo.com/v3.0/tracks/?client_id=09c4eecf&format=json`);
            const data = await response.json();
            setPlaylist(data.results || []);
        } catch (error) {
            console.error("Ошибка загрузки плейлиста:", error);
        }
    };

    const playTrack = async (track: MusicTrack) => {
        try {
            await TrackPlayer.reset();
            await TrackPlayer.add({
                id: track.id,
                url: track.audio,
                title: track.name,
                artist: track.artist_name,
            } as Track);
            await TrackPlayer.play();
        } catch (error) {
            console.error("Ошибка воспроизведения:", error);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={loadPlaylist} style={styles.button}>
                <Text style={styles.buttonText}>Загрузить плейлист</Text>
            </TouchableOpacity>

            <FlatList
                data={playlist}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => playTrack(item)} style={styles.trackItem}>
                        <Text style={styles.trackTitle}>{item.name}</Text>
                        <Text style={styles.artist}>{item.artist_name}</Text>
                    </TouchableOpacity>
                )}
            />

            <TouchableOpacity
                onPress={() =>
                    playbackState.state === State.Playing ? TrackPlayer.pause() : TrackPlayer.play()
                }
                style={styles.button}
            >
                <Text style={styles.buttonText}>
                    {playbackState.state === State.Playing ? "Пауза" : "Играть"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#000" },
    button: { backgroundColor: "#1DB954", padding: 15, borderRadius: 5, alignItems: "center", marginBottom: 10 },
    buttonText: { color: "#fff", fontSize: 16 },
    trackItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#555" },
    trackTitle: { color: "#fff", fontSize: 16 },
    artist: { color: "#888" },
});

export default PlaylistScreen;
