import { useContext } from "react";
import { ProfileContext } from "../context/ProfileContext";
import "../styles/Profile.css";

const Profile = ({ isSidebarOpen }) => {
    const { profile } = useContext(ProfileContext);

    if (!profile) {
        return <p className="loading-text">Loading profile...</p>;
    }

    return (
        <div className={`profile-container ${isSidebarOpen ? "sidebar-open" : ""}`}>
            <div className="profile-header">
                <img src={profile.avatar || "/default-avatar.png"} alt="Avatar" className="profile-avatar" />
                <h2>👤 {profile.fullName}</h2>
                <p className="profile-role">{profile.role || "User"}</p>
            </div>

            <div className="profile-details">
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Phone:</strong> {profile.phone || "N/A"}</p>
                <p><strong>Bio:</strong> {profile.bio || "No bio available"}</p>
                <p><strong>Skills:</strong> {profile.skills || "Not provided"}</p>
                <p><strong>Experience:</strong> {profile.experience || "Not provided"}</p>
                <p><strong>Education:</strong> {profile.education || "Not provided"}</p>
            </div>

            <div className="profile-links">
                {profile.linkedin && (
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin">
                        🔗 LinkedIn
                    </a>
                )}
                {profile.github && (
                    <a href={profile.github} target="_blank" rel="noopener noreferrer" className="github">
                        🐙 GitHub
                    </a>
                )}
            </div>
        </div>
    );
};

export default Profile;
