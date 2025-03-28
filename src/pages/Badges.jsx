import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "../api/axios";
import "../styles/Badges.css"; // Import the updated CSS file

const Badges = () => {
    const { user } = useContext(AuthContext);
    const [userBadges, setUserBadges] = useState([]);

    useEffect(() => {
        const fetchBadges = async () => {
            try {
                const password = localStorage.getItem("password");
                if (!password) {
                    console.error("No password stored.");
                    return;
                }

                const response = await axios.get(`/api/profile/${user}/badges`, {
                    auth: { username: user, password },
                });

                setUserBadges(response.data);
            } catch (error) {
                console.error("Error fetching badges:", error);
            }
        };

        if (user) fetchBadges();
    }, [user]);

    return (
        <div className="badges-container">
            <h2 className="badges-title">🏆 Your Achievements</h2>
            {userBadges.length === 0 ? (
                <p className="no-badges">No badges earned yet. Keep learning! 📚</p>
            ) : (
                <div className="badges-grid">
                    {userBadges.map((badge) => (
                        <div key={badge.badgeName} className="badge-card">
                            <img
                                src={badge.imageUrl || "/default-badge.png"}
                                alt={badge.badgeName}
                                className="badge-image"
                            />
                            <span className="badge-name">{badge.badgeName}</span>
                            <p className="badge-description">{badge.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Badges;