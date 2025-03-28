import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Learning Paths", path: "/learning-paths" },
        { name: "Badges", path: "/badges" },
        { name: "Profile", path: "/profile" },
    ];

    return (
        <>
            {/* Sidebar Toggle Button */}
            <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? "❌" : "☰"}
            </button>

            {/* Sidebar */}
            <div className={`sidebar ${isOpen ? "active" : ""}`}>
                <div className="sidebar-header">
                    <button className="sidebar-close" onClick={() => setIsOpen(false)}></button>
                    <h1 className="sidebar-title">Eduway</h1>
                </div>
                <nav className="sidebar-nav">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`sidebar-link ${location.pathname === item.path ? "active" : ""}`}
                            onClick={() => setIsOpen(false)} // Close sidebar on link click
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>
        </>
    );
};

export default Sidebar;
