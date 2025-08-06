import { useEffect, useState } from "react";

import "../CSS/dashboard.css"; 
import { useNavigate } from "react-router-dom";

const OwnerDashboard = () => {
  const [ownerName, setOwnerName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user || user.role !== "Owner") {
      navigate("/login");
    } else {
      setOwnerName(user.name);
    }
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome, {ownerName} 👋</h2>
        <p>Here’s your Restaurant Owner Dashboard</p>
      </div>

      <div className="dashboard-sections">
        <div className="dashboard-card" onClick={() => navigate("/owner/bookings")}>
          <h4>Manage Bookings</h4>
          <p>View and confirm table bookings.</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/owner/menu")}>
          <h4>Manage Menu</h4>
          <p>Add, edit, or remove menu items.</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/owner/tables")}>
          <h4>Manage Tables</h4>
          <p>View or update table availability.</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/owner/profile")}>
          <h4>Profile Settings</h4>
          <p>Edit your account or restaurant details.</p>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
