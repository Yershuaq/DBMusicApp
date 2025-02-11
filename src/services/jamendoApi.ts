import axios from "axios";

const API_KEY = "09c4eecf";
const BASE_URL = "https://api.jamendo.com/v3.0/tracks/";

export const getTracks = async () => {
    try {
        const response = await axios.get(`${BASE_URL}?client_id=${API_KEY}&format=json&limit=10`);
        return response.data.results;
    } catch (error) {
        console.error("Ошибка загрузки треков", error);
        return [];
    }
};
