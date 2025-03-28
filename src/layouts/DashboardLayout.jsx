import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/DashboardLayout.css"; // Import CSS file

const DashboardLayout = ({ children }) => {
    return (
        <div className="dashboard-layout">
            <Sidebar />
            <div className="main-content">
                <Navbar />
                <div className="page-content">{children}</div>
            </div>
        </div>
    );
};

export default DashboardLayout;