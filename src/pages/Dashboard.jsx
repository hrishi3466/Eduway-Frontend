import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import DashboardLayout from "../layouts/DashboardLayout";
import "../styles/Dashboard.css";

const Dashboard = () => {
    const { user, profile } = useContext(AuthContext);

    return (
        <DashboardLayout>
            <div className="dashboard-container">
                {/* Title with animation */}
                <h1 className="dashboard-title">🚀 Welcome, {user}!</h1>

                {/* Subtitle with animation */}
                <p className="dashboard-subtitle">Start exploring your learning journey 📚</p>

                {/* Profile Card Animation */}
                {profile && (
                    <div className="profile-info">
                        <h2>👤 Your Profile</h2>
                        <p><strong>Name:</strong> {profile.fullName}</p>
                        <p><strong>Email:</strong> {profile.email}</p>
                        <p><strong>Bio:</strong> {profile.bio || "No bio available"}</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;