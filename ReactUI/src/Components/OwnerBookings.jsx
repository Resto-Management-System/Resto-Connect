// OwnerBookings.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { getMyRestaurantBookings, updateBookingStatus } from '../Services/bookings';
import '../CSS/owner-bookings.css';


// A constant array of dummy booking data to use for demonstration
const DUMMY_BOOKINGS = [
  {
    booking_id: 101,
    customer_name: "Rutuja Desai",
    start_time: "2025-08-11T19:00:00.000Z",
    end_time: "2025-08-11T21:00:00.000Z",
    num_guests: 4,
    table_id: 1001,
    capacity: 4,
    category: "Gold",
    special_requests: "Window seat",
    status: "pending",
    created_at: "2025-08-09T10:30:00.000Z",
  },
  {
    booking_id: 102,
    customer_name: "Harshita Singh",
    start_time: "2025-08-11T18:30:00.000Z",
    end_time: "2025-08-11T20:30:00.000Z",
    num_guests: 2,
    table_id: 1003,
    capacity: 2,
    category: "Premium",
    special_requests: null,
    status: "confirmed",
    created_at: "2025-08-08T15:45:00.000Z",
  },
  {
    booking_id: 103,
    customer_name: "Charlie Brown",
    start_time: "2025-08-12T20:00:00.000Z",
    end_time: "2025-08-12T22:00:00.000Z",
    num_guests: 6,
    table_id: 1002,
    capacity: 6,
    category: "Silver",
    special_requests: "Birthday celebration",
    status: "cancelled",
    created_at: "2025-08-07T18:10:00.000Z",
  },
];

// Set this flag to 'true' to use dummy data, or 'false' to fetch from the API.
// const useDummyData = false;
const useDummyData = true; 


const OwnerBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Use a ref to track if the success toast has already been shown
  const hasShownToastRef = useRef(false);

  useEffect(() => {
     const fetchBookings = async () => {
      // Check the flag to decide whether to use dummy data or the API
      if (useDummyData) {
        setBookings(DUMMY_BOOKINGS);
        setLoading(false);
        if (!hasShownToastRef.current) {
          toast.success("Bookings loaded successfully!", { autoClose: 1500 });
          hasShownToastRef.current = true;
        }
        return;
      }
      // If not using dummy data, fetch from the API
      const storedUser = JSON.parse(sessionStorage.getItem('user'));
      const storedToken = sessionStorage.getItem('token');

      if (!storedUser || storedUser.role !== 'owner' || !storedToken) {
        toast.error("Unauthorized access. Please log in as an owner.");
        navigate('/login');
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await getMyRestaurantBookings();
        setBookings(data);
        
        // Use the ref to check and set the toast message only once
        if (!hasShownToastRef.current) {
          toast.success("Bookings loaded successfully!", { autoClose: 1500 });
          hasShownToastRef.current = true;
        }
        
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError(err.message || "Failed to fetch bookings.");
        toast.error(err.message || "Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]); // The dependency array now only contains 'navigate'

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await updateBookingStatus(bookingId, newStatus);
      toast.success(`Booking ${bookingId} status updated to ${newStatus}.`, { autoClose: 1500 });

      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking.booking_id === bookingId ? { ...booking, status: newStatus } : booking
        )
      );
    } catch (err) {
      console.error("Error updating booking status:", err);
      toast.error(err.message || "Failed to update booking status.");
    }
  };

  if (loading) {
    return <div className="loading-message">Loading bookings...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="bookings-container-new">
      <h2 className="bookings-title-new">My Restaurant Bookings</h2>
      {bookings.length === 0 ? (
        <div className="no-bookings-message">No bookings found for your restaurant.</div>
      ) : (
        <div className="bookings-list-new">
          {bookings.map((booking) => (
            <div key={booking.booking_id} className="booking-card-new">
              <div className="booking-details-new">
                <p><strong>Booking ID:</strong> {booking.booking_id}</p>
                <p><strong>Customer Name:</strong> {booking.customer_name}</p>
                <p><strong>Date:</strong> {new Date(booking.start_time).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {new Date(booking.start_time).toLocaleTimeString()} - {new Date(booking.end_time).toLocaleTimeString()}</p>
                <p><strong>Guests:</strong> {booking.num_guests}</p>
                <p><strong>Table:</strong> {booking.table_id} (Capacity: {booking.capacity}, Category: {booking.category})</p>
                {booking.special_requests && (
                  <p><strong>Requests:</strong> {booking.special_requests}</p>
                )}
                <p className="booking-created-at">Booked on: {new Date(booking.created_at).toLocaleString()}</p>
              </div>
              <div className="booking-actions-new">
                <select
                  value={booking.status}
                  onChange={(e) => handleStatusChange(booking.booking_id, e.target.value)}
                  className="status-select-new"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerBookings;
