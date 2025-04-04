import axios from "axios";

const BASE_URL = "http://localhost:8080"; // Backend URL

export default axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true, // Enable credentials if needed
});
