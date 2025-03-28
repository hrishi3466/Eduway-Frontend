import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import { ProfileProvider } from "./context/ProfileContext"; 
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LearningPaths from "./pages/LearningPaths";
import Badges from "./pages/Badges";
import Profile from "./pages/Profile"; 
import Sidebar from "./components/Sidebar"; 
import Navbar from "./components/Navbar"; 
import "./App.css";

function App() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <AuthProvider>
            <ProfileProvider> 
                <Router>
                    <div className={`app-container ${isCollapsed ? "collapsed" : ""}`}> 
                        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} /> 
                        <div className="main-content">
                            <Navbar /> 
                            <div className="content">
                                <Routes>
                                    {/* Root route handling */}
                                    <Route path="/" element={<Navigate to="/dashboard" />} />

                                    {/* Public Routes */}
                                    <Route element={<PublicRoute />}>
                                        <Route path="/login" element={<Login />} />
                                    </Route>

                                    {/* Private Routes */}
                                    <Route element={<PrivateRoute />}>
                                        <Route path="/dashboard" element={<Dashboard />} />
                                        <Route path="/learning-paths" element={<LearningPaths />} />
                                        <Route path="/badges" element={<Badges />} />
                                        <Route path="/profile" element={<Profile />} /> 
                                    </Route>

                                    {/* Catch-all route */}
                                    <Route path="*" element={<Navigate to="/dashboard" />} />
                                </Routes>
                            </div>
                        </div>
                    </div>
                </Router>
            </ProfileProvider>
        </AuthProvider>
    );
}

export default App;