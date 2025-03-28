import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "../api/axios";
import "../styles/LearningPaths.css";

const LearningPaths = () => {
    const { user } = useContext(AuthContext);
    const [learningPaths, setLearningPaths] = useState([]);

    useEffect(() => {
        const fetchLearningPaths = async () => {
            try {
                const response = await axios.get(`/api/profile/${user}/learning-progress`);
                setLearningPaths(Object.entries(response.data));
            } catch (error) {
                console.error("Error fetching learning paths:", error);
            }
        };

        fetchLearningPaths();
    }, [user]);

    return (
        <div className="learning-paths-container">
            <h2 className="learning-paths-title">🚀 My Learning Paths</h2>
            {learningPaths.length === 0 ? (
                <p className="no-paths-message">No learning paths started yet</p>
            ) : (
                <ul className="learning-paths-list">
                    {learningPaths.map(([pathName, details]) => (
                        <li key={pathName} className="learning-path-item">
                            <div className="learning-path-header">
                                <h3 className="learning-path-name">{pathName}</h3>
                                <span className="learning-path-progress-percentage">
                                    {details.progressPercentage.toFixed(2)}%
                                </span>
                            </div>
                            <div className="learning-path-progress-bar">
                                <div 
                                    className="learning-path-progress-fill" 
                                    style={{ width: `${details.progressPercentage}%` }}
                                ></div>
                            </div>
                            <div className="learning-path-details">
                                <p className="learning-path-topics">
                                    Completed Topics: {details.completedTopics} / {details.totalTopics}
                                </p>
                                {details.progressPercentage === 100 && (
                                    <span className="completed-badge">🏆 Completed</span>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LearningPaths;
