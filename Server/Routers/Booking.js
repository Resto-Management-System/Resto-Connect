const db = require("../utils/dbpool")
const {apiSuccess, apiError} = require("../utils/apiresult")
const {createToken} = require("../utils/jwtauth")
const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router()

// 1. Create a new booking
router.post("/", (req, res) => {
    const { customer_id, resto_id, table_id, start_time, end_time } = req.body;

    const query = `
        INSERT INTO bookings (customer_id, resto_id, table_id, start_time, end_time, status)
        VALUES (?, ?, ?, ?, ?, 'Booked')`;

    db.query(query, [customer_id, resto_id, table_id, start_time, end_time], (err, result) => {
        if (err) return res.status(500).send(apiError(err));
        res.send(apiSuccess({
            message: "Booking created successfully",
            booking_id: result.insertId
        }));
    });
});

// 2. Get bookings for a specific customer
router.get("/customer/:customer_id", (req, res) => {
    const { customer_id } = req.params;

    const query = `
        SELECT b.*, r.name AS restaurant_name, t.table_no
        FROM bookings b
        JOIN restaurant r ON b.resto_id = r.restaurant_id
        JOIN tabledata t ON b.table_id = t.table_id
        WHERE b.customer_id = ?`;

    db.query(query, [customer_id], (err, result) => {
        if (err) return res.status(500).send(apiError(err));
        res.send(apiSuccess(result));
    });
});

// 3. Get bookings for a specific restaurant
router.get("/restaurant/:resto_id", (req, res) => {
    const { resto_id } = req.params;

    const query = `
        SELECT b.*, c.name AS customer_name, t.table_no
        FROM bookings b
        JOIN customer c ON b.customer_id = c.customer_id
        JOIN tabledata t ON b.table_id = t.table_id
        WHERE b.resto_id = ?`;

    db.query(query, [resto_id], (err, result) => {
        if (err) return res.status(500).send(apiError(err));
        res.send(apiSuccess(result));
    });
});

// 4. Cancel a booking
router.put("/cancel/:booking_id", (req, res) => {
    const { booking_id } = req.params;

    const query = `UPDATE bookings SET status = 'Cancelled' WHERE booking_id = ?`;

    db.query(query, [booking_id], (err, result) => {
        if (err) return res.status(500).send(apiError(err));
        res.send(apiSuccess({ message: "Booking cancelled successfully" }));
    });
});

// 5. Mark a booking as completed
router.put("/complete/:booking_id", (req, res) => {
    const { booking_id } = req.params;

    const query = `UPDATE bookings SET status = 'Completed' WHERE booking_id = ?`;

    db.query(query, [booking_id], (err, result) => {
        if (err) return res.status(500).send(apiError(err));
        res.send(apiSuccess({ message: "Booking marked as completed" }));
    });
});

// 6. Delete a booking
router.delete("/:booking_id", (req, res) => {
    const { booking_id } = req.params;

    const query = `DELETE FROM bookings WHERE booking_id = ?`;

    db.query(query, [booking_id], (err, result) => {
        if (err) return res.status(500).send(apiError(err));
        res.send(apiSuccess({ message: "Booking deleted successfully" }));
    });
});

module.exports = router;
