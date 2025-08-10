// bookings.js
import axios from "axios";
import { baseUrl } from "./apiconfig"; // Ensure apiconfig.js is correct

export async function getMyRestaurantBookings() {
    // The endpoint now needs to be protected, so it needs the token
    const url = `${baseUrl}/resto/my-restaurant/bookings`;
    try {
        const resp = await axios.get(url, {
            headers: {
                Authorization: `bearer ${sessionStorage.getItem('token')}`
            }
        });
        if (resp.status !== 200) { throw new Error("Axios API call failed with status " + resp.status); }
        const result = resp.data;
        if (result.status !== "success") {
            const errorMessage = typeof result.message === 'object' ? JSON.stringify(result.message) : (result.message || "API returned an error");
            throw new Error(errorMessage);
        }
        return result.data;
    } catch (err) { console.error("Error fetching bookings:", err); throw err; }
}

export async function updateBookingStatus(bookingId, newStatus) {
    const url = `${baseUrl}/resto/bookings/${bookingId}`;
    try {
        const resp = await axios.put(url, { status: newStatus }, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        if (resp.status !== 200) { throw new Error("Axios API call failed with status " + resp.status); }
        const result = resp.data;
        if (result.status !== "success") {
            const errorMessage = typeof result.message === 'object' ? JSON.stringify(result.message) : (result.message || "API returned an error");
            throw new Error(errorMessage);
        }
        return result.data;
    } catch (err) { console.error(`Error updating booking ${bookingId} status to ${newStatus}:`, err); throw err; }
}

export async function deleteBooking(bookingId) {
    const url = `${baseUrl}/resto/bookings/${bookingId}`;
    try {
        const resp = await axios.delete(url, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });
        if (resp.status !== 200) { throw new Error("Axios API call failed with status " + resp.status); }
        const result = resp.data;
        if (result.status !== "success") {
            const errorMessage = typeof result.message === 'object' ? JSON.stringify(result.message) : (result.message || "API returned an error");
            throw new Error(errorMessage);
        }
        return result.data;
    } catch (err) { console.error(`Error deleting booking ${bookingId}:`, err); throw err; }
}
