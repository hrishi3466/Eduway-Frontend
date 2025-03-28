import { createContext, useState, useEffect } from "react";
import axios from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [badges, setBadges] = useState([]); // Store badges

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedProfile = localStorage.getItem("profile");

        if (storedUser) setUser(JSON.parse(storedUser));
        if (storedProfile) setProfile(JSON.parse(storedProfile));
    }, []);

    const fetchUserProfile = async (username) => {
        try {
            const password = localStorage.getItem("password");
            if (!password) {
                console.error("No password stored, authentication may fail.");
                return;
            }

            console.log("Fetching profile for:", username);
            const response = await axios.get(`/api/profile/${username}`, {
                auth: { username, password },
            });

            console.log("Profile fetched:", response.data);
            setProfile(response.data);
            localStorage.setItem("profile", JSON.stringify(response.data));

            // Fetch badges after profile
            await fetchUserBadges(username);
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    const fetchUserBadges = async (username) => {
        try {
            const password = localStorage.getItem("password");
            if (!password) {
                console.error("No password stored, authentication may fail.");
                return;
            }

            console.log("Fetching badges for:", username);
            const response = await axios.get(`/api/profile/${username}/badges`, {
                auth: { username, password },
            });

            console.log("Badges fetched:", response.data);
            setBadges(response.data);
        } catch (error) {
            console.error("Error fetching badges:", error);
        }
    };

    const login = async (username, password) => {
        try {
            const response = await axios.post("/auth/signin", { username, password });

            if (response.data.includes("Login successful")) {
                localStorage.setItem("user", JSON.stringify(username));
                localStorage.setItem("password", password);
                setUser(username);

                await fetchUserProfile(username);
            } else {
                throw new Error("Invalid credentials");
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("profile");
        localStorage.removeItem("password");
        setUser(null);
        setProfile(null);
        setBadges([]); // Clear badges on logout
    };

    return (
        <AuthContext.Provider value={{ user, profile, badges, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
