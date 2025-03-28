import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
    const { logout, profile } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="navbar">
            <h1 className="navbar-title">Eduway Dashboard</h1>
            {profile && <span className="navbar-user">Hi, {profile.fullName} 👋</span>}
            <button onClick={handleLogout} className="navbar-logout">Logout</button>
        </div>
    );
};

export default Navbar; 