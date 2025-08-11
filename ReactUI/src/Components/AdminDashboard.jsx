import { useNavigate } from "react-router";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Static mock data
  const totalRestaurants = 12;
  const activeRestaurants = 7;
  const pendingRestaurants = 3;
  const blockedRestaurants = 2;

  const goToRestaurantList = (status) => {
    navigate(`/admin/restaurants?status=${status}`);
  };

  return (
    <div className="container">
      <h3 className="mb-4">Admin Dashboard</h3>

      {/* Cards Row */}
      <div className="row g-4">
        <div className="col-md-3">
          <div className="card bg-white text-dark shadow h-100">
            <div className="card-body text-center">
              <h5>Total Restaurants</h5>
              <h2>{totalRestaurants}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-white text-dark shadow h-100">
            <div className="card-body text-center">
              <h5>Active Restaurants</h5>
              <h2>{activeRestaurants}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-white text-dark shadow h-100">
            <div className="card-body text-center">
              <h5>Pending Approvals</h5>
              <h2>{pendingRestaurants}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-white text-dark shadow h-100">
            <div className="card-body text-center">
              <h5>Blocked Restaurants</h5>
              <h2>{blockedRestaurants}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Buttons */}
      <h5 className="mt-5 mb-3">Quick View</h5>
      <div className="d-flex flex-wrap gap-3">
        <button className="btn btn-outline-success" onClick={() => goToRestaurantList("active")}>
          View Active Restaurants
        </button>
        <button className="btn btn-outline-warning" onClick={() => goToRestaurantList("pending")}>
          View Pending Restaurants
        </button>
        <button className="btn btn-outline-danger" onClick={() => goToRestaurantList("blocked")}>
          View Blocked Restaurants
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
