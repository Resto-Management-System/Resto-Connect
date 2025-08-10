// Layout.jsx (Admin Layout with Sidebar and Topbar using Bootstrap)
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-dark text-white p-3 vh-100" style={{ width: "250px" }}>
        <h4 className="mb-4">Resto Connect</h4>
        <ul className="nav flex-column">
          <li><Link className="nav-link text-white" to="/admin">Dashboard</Link></li>
          <li><Link className="nav-link text-white" to="/admin/restaurants">Restaurants</Link></li>
          <li><Link className="nav-link text-white" to="/admin/reviews">Reviews</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
        <nav className="navbar navbar-light bg-light shadow-sm px-4">
          <span className="navbar-brand">Admin Dashboard</span>
          <button className="btn btn-outline-danger btn-sm">Logout</button>
        </nav>

        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
