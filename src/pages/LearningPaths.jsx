import { useEffect, useState } from "react";
import axios from "../api/axios";

const LearningPaths = () => {
    const [learningPaths, setLearningPaths] = useState([]);

    useEffect(() => {
        const fetchLearningPaths = async () => {
            try {
                const response = await axios.get("/api/profile/demoUser/learning-progress");
                setLearningPaths(Object.entries(response.data));
            } catch (error) {
                console.error("Error fetching learning paths:", error);
            }
        };

        fetchLearningPaths();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold">Learning Paths</h2>
            <ul>
                {learningPaths.map(([pathId, details]) => (
                    <li key={pathId} className="border p-2 my-2">
                        <strong>Path ID:</strong> {pathId} <br />
                        <strong>Progress:</strong> {details.progressPercentage.toFixed(2)}%
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LearningPaths;
