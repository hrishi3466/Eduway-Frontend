import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";
import { AuthContext } from "./AuthContext";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (user) {
            console.log("Fetching profile for user:", user);
            fetchUserProfile(user);
        }
    }, [user]);

    const fetchUserProfile = async (username) => {
        try {
            const response = await axios.get(`/api/profile/${username}`);
            console.log("Profile fetched:", response.data);
            setProfile(response.data);  // ✅ Ensure state is updated
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

    return (
        <ProfileContext.Provider value={{ profile, fetchUserProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};
