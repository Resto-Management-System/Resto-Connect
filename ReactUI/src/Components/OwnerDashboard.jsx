import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router'; // Using 'react-router-dom' for <Link>
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import '../CSS/owner-dashboard.css'; // This will be the NEW CSS file

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [userRole, setUserRole] = useState("Owner");
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    //const storedToken = sessionStorage.getItem('token');
    //-- Retrieve user details from sessionStorage-----------------------------------------------------------
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    
    if (storedUser) {
      setUserName(storedUser?.name || "Owner");
      setUserRole(storedUser?.role || "Owner")
    } 
    else 
      {
        toast.info("Please log in to access the dashboard.");
        navigate('/login');
        return;
      }


    // if (storedToken) {
    //   try {
    //     // Decode the token to get user details
    //     const decoded = jwtDecode(storedToken);

    //     setUserName(decoded.name || "Owner");
    //     setUserRole(decoded.role || "Owner");
    //   } catch (error) {
    //     console.error("Failed to decode JWT token:", error);
    //     toast.error("Session expired or invalid. Please log in again.");
    //     handleSignOut();
    //     return;
    //   }
    // } else {
    //   toast.info("Please log in to access the dashboard.");
    //   navigate('/login');
    //   return;
    // }

    const updateDateTime = () => {
      const now = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      setCurrentDateTime(now.toLocaleDateString("en-US", options));
    };

    updateDateTime();
    // Update the time every minute
    const intervalId = setInterval(updateDateTime, 60000);
    // Cleanup function to clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, [navigate]);

  const handleSignOut = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    toast.info("You have been signed out.");
    navigate('/login');
  };

  return (
    <div className="dashboard-layout-new">
      {/* Sidebar for navigation */}
      <aside className="dashboard-sidebar-new">
        <div className="sidebar-logo">Resto Connect</div>
        <nav className="sidebar-nav">
          <Link to="/ownerdashboard" className="nav-item active">🏠 Dashboard</Link>
          <Link to="/owner/bookings" className="nav-item">📅 Bookings</Link>
          <Link to="/owner/menu" className="nav-item">🍽️ Menu</Link>
          <Link to="/owner/tables" className="nav-item">🪑 Tables</Link>
          <Link to="/owner/reports" className="nav-item">📊 Reports</Link>
          {/* The Settings link has been removed as per the requirement */}
        </nav>
        <div className="sidebar-footer">
          <Link to="/owner/profile" className="profile-btn">👤 Profile</Link>
          <button onClick={handleSignOut} className="sign-out-btn">🚪 Sign Out</button>
        </div>
      </aside>

      {/* Main content area */}
      <main className="dashboard-main-content-new">
        <header className="main-header-new">
          <div className="header-left">
            <h1>Welcome, {userName}!</h1>
            <p className="current-date-time">{currentDateTime}</p>
          </div>
          <div className="header-right">
            <span className="user-role-new">{userRole.toUpperCase()}</span>
          </div>
        </header>

        {/* Alerts Section */}
        <section className="alerts-section-new">
          <div className="alert-new alert-info-new">
            <span className="alert-icon-new">💡</span>
            <div>
              <strong>Info:</strong> Your restaurant is performing well this month!
            </div>
          </div>
          <div className="alert-new alert-warning-new">
            <span className="alert-icon-new">🔔</span>
            <div>
              <strong>Reminder:</strong> Upcoming maintenance scheduled for Kitchen equipment on 20th Aug.
            </div>
          </div>
        </section>

        {/* KPI Grid */}
        <section className="kpi-grid-new">
          <div className="kpi-card-new">
            <div className="kpi-icon">💰</div>
            <div className="kpi-value">₹18,450</div>
            <div className="kpi-label-new">Monthly Revenue</div>
            <div className="kpi-trend-new positive">+15.2%</div>
          </div>
          <div className="kpi-card-new">
            <div className="kpi-icon">🧑‍🤝‍🧑</div>
            <div className="kpi-value">45</div>
            <div className="kpi-label-new">Active Customers</div>
            <div className="kpi-trend-new positive">+2 new</div>
          </div>
          <div className="kpi-card-new">
            <div className="kpi-icon">📈</div>
            <div className="kpi-value">89%</div>
            <div className="kpi-label-new">Table Efficiency</div>
            <div className="kpi-trend-new positive">+3.2%</div>
          </div>
          <div className="kpi-card-new">
            <div className="kpi-icon">🍔</div>
            <div className="kpi-value">247</div>
            <div className="kpi-label-new">Total Dishes</div>
            <div className="kpi-trend-new positive">+12 added</div>
          </div>
        </section>

        {/* Main Content Panels */}
        <div className="main-panels-grid-new">
          <div className="panel-new large-panel">
            <h2>Revenue Trend (Last 6 Months)</h2>
            <div className="chart-placeholder">
              [Dynamic Revenue Chart Here]<br />
              Jan: ₹15,200 | Feb: ₹16,100 | Mar: ₹17,300<br />
              Apr: ₹16,800 | May: ₹17,900 | Jun: ₹18,450
            </div>
          </div>

          <div className="panel-new small-panel">
            <h2>Quick Actions</h2>
            <div className="quick-actions-grid-new">
              <Link to="/owner/bookings" className="action-card-new">
                <span role="img" aria-label="Bookings">📅</span>
                <h3>Manage Bookings</h3>
              </Link>
              <Link to="/owner/menu" className="action-card-new">
                <span role="img" aria-label="Menu">🍽️</span>
                <h3>Manage Menu</h3>
              </Link>
              <Link to="/owner/tables" className="action-card-new">
                <span role="img" aria-label="Tables">🪑</span>
                <h3>Manage Tables</h3>
              </Link>
              <Link to="/owner/reports" className="action-card-new">
                <span role="img" aria-label="Reports">📊</span>
                <h3>View Reports</h3>
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar-like Panels within Main Content */}
        <div className="secondary-panels-grid-new">
          <div className="panel-new">
            <h2>Key Business Metrics</h2>
            <ul className="metrics-list-new">
              <li>Avg Revenue/Customer: <span>₹410</span></li>
              <li>Customer Retention Rate: <span>94.2%</span></li>
              <li>Operating Margin: <span>68.5%</span></li>
              <li>ROI on Equipment: <span>23.4%</span></li>
            </ul>
          </div>

          <div className="panel-new">
            <h2>This Month Summary</h2>
            <ul className="metrics-list-new">
              <li>New Customers: <span>2</span></li>
              <li>New Dishes Added: <span>12</span></li>
              <li>Total Transactions: <span>156</span></li>
              <li>Outstanding Payments: <span>₹2,500</span></li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OwnerDashboard;
