import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const mockRestaurants = [
  { id: 1, name: "Spice Villa", location: "Mumbai", status: "active", owner: "Ravi", rating: 4.2 },
  { id: 2, name: "Ocean Breeze", location: "Chennai", status: "blocked", owner: "Anu", rating: 3.8 },
  { id: 3, name: "Biryani House", location: "Hyderabad", status: "pending", owner: "Asif", rating: 4.7 },
];

const RestaurantManager = () => {
  const [restaurants, setRestaurants] = useState(mockRestaurants);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const statusFromURL = searchParams.get("status");
    if (statusFromURL) setFilterStatus(statusFromURL);
  }, [searchParams]);

  const handleStatusChange = (id, newStatus) => {
    const updated = restaurants.map(r =>
      r.id === id ? { ...r, status: newStatus } : r
    );
    setRestaurants(updated);
  };

  const filtered = filterStatus === "all"
    ? restaurants
    : restaurants.filter(r => r.status === filterStatus);

  return (
    <div>
      <h4>Manage Restaurants</h4>

      <div className="btn-group mb-3">
        <button className="btn btn-outline-secondary" onClick={() => setFilterStatus("all")}>All</button>
        <button className="btn btn-outline-success" onClick={() => setFilterStatus("active")}>Active</button>
        <button className="btn btn-outline-warning" onClick={() => setFilterStatus("pending")}>Pending</button>
        <button className="btn btn-outline-danger" onClick={() => setFilterStatus("blocked")}>Blocked</button>
      </div>

      {filtered.length === 0 ? (
        <p>No restaurants found.</p>
      ) : (
        <div className="row">
          {filtered.map(r => (
            <div key={r.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{r.name}</h5>
                  <p className="card-text">📍 {r.location}</p>
                  <p className="card-text">👨‍🍳 Owner: {r.owner}</p>
                  <p className="card-text">⭐ Rating: {r.rating}</p>
                  <p className="badge bg-info">{r.status.toUpperCase()}</p>
                </div>
                <div className="card-footer">
                  {r.status === "pending" && (
                    <button className="btn btn-success btn-sm" onClick={() => handleStatusChange(r.id, "active")}>
                      Activate
                    </button>
                  )}
                  {r.status === "active" && (
                    <button className="btn btn-danger btn-sm" onClick={() => handleStatusChange(r.id, "blocked")}>
                      Block
                    </button>
                  )}
                  {r.status === "blocked" && (
                    <button className="btn btn-warning btn-sm" onClick={() => handleStatusChange(r.id, "active")}>
                      Unblock
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantManager;
