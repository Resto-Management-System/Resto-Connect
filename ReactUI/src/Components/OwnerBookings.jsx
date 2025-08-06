import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { getMyRestaurantBookings, updateBookingStatus, deleteBooking } from '../Services/bookings';
import '../CSS/owner-bookings.css'; // New CSS file for this page

const OwnerBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      const storedUser = JSON.parse(sessionStorage.getItem('user'));
      const storedToken = sessionStorage.getItem('token');

      // Basic authentication check
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
        toast.success("Bookings loaded successfully!", { autoClose: 1500 });
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError(err.message || "Failed to load bookings.");
        toast.error("Failed to load bookings. " + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]); // Re-fetch if navigate changes (though unlikely for this effect)

  const handleStatusChange = async (bookingId, newStatus) => {
    if (!window.confirm(`Are you sure you want to change status to '${newStatus}' for booking ID ${bookingId}?`)) {
      return;
    }
    try {
      await updateBookingStatus(bookingId, newStatus);
      setBookings(bookings.map(booking => 
        booking.booking_id === bookingId ? { ...booking, status: newStatus } : booking
      ));
      toast.success(`Booking ${bookingId} status updated to ${newStatus}!`);
    } catch (err) {
      console.error("Error updating booking status:", err);
      toast.error("Failed to update booking status. " + (err.response?.data?.message || err.message));
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    if (!window.confirm(`Are you sure you want to delete booking ID ${bookingId}? This action cannot be undone.`)) {
      return;
    }
    try {
      await deleteBooking(bookingId);
      setBookings(bookings.filter(booking => booking.booking_id !== bookingId));
      toast.success(`Booking ${bookingId} deleted successfully!`);
    } catch (err) {
      console.error("Error deleting booking:", err);
      toast.error("Failed to delete booking. " + (err.response?.data?.message || err.message));
    }
  };

  if (loading) {
    return (
      <div className="bookings-container-new">
        <p className="loading-message">Loading bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bookings-container-new">
        <p className="error-message">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bookings-container-new">
      <h2 className="bookings-title-new">Manage Bookings</h2>

      {bookings.length === 0 ? (
        <p className="no-bookings-message">No bookings found for your restaurant.</p>
      ) : (
        <div className="bookings-list-new">
          {bookings.map((booking) => (
            <div key={booking.booking_id} className="booking-card-new">
              <div className="booking-header-new">
                <h3>Booking ID: {booking.booking_id}</h3>
                <span className={`booking-status-new status-${booking.status}`}>
                  {booking.status.toUpperCase()}
                </span>
              </div>
              <div className="booking-details-new">
                <p><strong>Date:</strong> {new Date(booking.booking_date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {booking.booking_time.substring(0, 5)}</p>
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
                <button 
                  onClick={() => handleDeleteBooking(booking.booking_id)} 
                  className="delete-btn-new"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerBookings;
