const db = require("../utils/dbpool")
const {apiSuccess, apiError} = require("../Utils/apiresult")
const {createToken} = require("../Utils/jwtauth")
const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router()

//get table list
router.get("/table",(req,resp)=>{
    const id=req.user.id
    db.query("select * from restaurants where owner_id=?",[id],(err,result)=>{
        if(err)
            return resp.send(apiError(err))
        db.query("select * from restaurant_tables where resto_id=?",[result[0].resto_id],(err,result2)=>{
            if(err)
                return resp.send(apiError(err))
            resp.send(apiSuccess(result2))
        })
    })
})


// Get all restaurants
router.get("/", (req, resp) => {
    const query = `SELECT * FROM restaurants`;

    db.query(query, (err, result) => {
        if (err) return resp.status(500).send(apiError(err));
        resp.send(apiSuccess(result));
    });
});

// get restobyid

router.get("/:id",(req,resp)=>{
    const{id}=req.params;

    db.query("SELECT * FROM restaurants  WHERE resto_id=?",[id],(err,result)=>{
        if(err)
         return resp.status(500).send(apiError(err));
        if(result.length===0)
            return resp.status(500).send(apiError("Restaurant not found"));
        resp.send(apiSuccess(result[0]));

        
    })

})

//get resto by owner id

router.get("/owner/:owner_id",(req,resp)=>{
   const{owner_id}=req.params;

    db.query("SELECT * FROM restaurants WHERE owner_id=?",[owner_id],(err,result)=>{
        if(err)
            return resp.status(500).send(apiError(err));
        resp.send(apiSuccess(result));
        })
    
})

// --- NEW CODE FOR BOOKING MANAGEMENT ---

// Get all bookings for the current owner's restaurant
router.get("/my-restaurant/bookings", (req, resp) => {
    // The user's ID comes from the JWT token
    const ownerId = req.user.id;

    // First, find the restaurant ID for this owner
    db.query("SELECT resto_id FROM restaurants WHERE owner_id=?", [ownerId], (err, restoResult) => {
        if (err) {
            console.error("Error finding restaurant for owner:", err);
            return resp.status(500).send(apiError("Failed to find owner's restaurant."));
        }
        if (restoResult.length === 0) {
            return resp.status(404).send(apiError("No restaurant found for this owner."));
        }

        const restoId = restoResult[0].resto_id;

        // Then, fetch all bookings for that restaurant, joining with users and tables for more details
        const query = `
            SELECT 
                b.*, 
                u.name as customer_name, 
                rt.capacity, 
                rt.category
            FROM bookings b
            JOIN users u ON b.customer_id = u.user_id
            JOIN restaurant_tables rt ON b.table_id = rt.table_id
            WHERE b.resto_id = ?
            ORDER BY b.start_time DESC
        `;

        db.query(query, [restoId], (err, bookingsResult) => {
            if (err) {
                console.error("Error fetching bookings:", err);
                return resp.status(500).send(apiError("Failed to fetch bookings."));
            }
            resp.send(apiSuccess(bookingsResult));
        });
    });
});

// Update the status of a specific booking
router.put("/bookings/:booking_id", (req, resp) => {
    const { booking_id } = req.params;
    const { status } = req.body;
    const ownerId = req.user.id;

    // Verify the booking belongs to the owner's restaurant before updating
    const verifyOwnershipQuery = `
        SELECT b.booking_id
        FROM bookings b
        JOIN restaurants r ON b.resto_id = r.resto_id
        WHERE b.booking_id = ? AND r.owner_id = ?
    `;

    db.query(verifyOwnershipQuery, [booking_id, ownerId], (err, verificationResult) => {
        if (err) {
            console.error("Error verifying booking ownership:", err);
            return resp.status(500).send(apiError("Internal Server Error."));
        }
        if (verificationResult.length === 0) {
            return resp.status(403).send(apiError("You do not have permission to modify this booking."));
        }

        // If ownership is confirmed, proceed with the update
        db.query("UPDATE bookings SET status = ? WHERE booking_id = ?", [status, booking_id], (err, result) => {
            if (err) {
                console.error("Error updating booking status:", err);
                return resp.status(500).send(apiError("Failed to update booking status."));
            }
            if (result.affectedRows === 0) {
                return resp.status(404).send(apiError("Booking not found."));
            }
            resp.send(apiSuccess("Booking status updated successfully."));
        });
    });
});

// Delete a booking
router.delete("/bookings/:booking_id", (req, resp) => {
    const { booking_id } = req.params;
    const ownerId = req.user.id;

    // Verify that the booking belongs to the owner's restaurant before deleting
    const verifyOwnershipQuery = `
        SELECT b.booking_id
        FROM bookings b
        JOIN restaurants r ON b.resto_id = r.resto_id
        WHERE b.booking_id = ? AND r.owner_id = ?
    `;

    db.query(verifyOwnershipQuery, [booking_id, ownerId], (err, verificationResult) => {
        if (err) {
            console.error("Error verifying booking ownership:", err);
            return resp.status(500).send(apiError("Internal Server Error."));
        }
        if (verificationResult.length === 0) {
            return resp.status(403).send(apiError("You do not have permission to delete this booking."));
        }

        // If ownership is confirmed, proceed with deletion
        db.query("DELETE FROM bookings WHERE booking_id = ?", [booking_id], (err, result) => {
            if (err) {
                console.error("Error deleting booking:", err);
                return resp.status(500).send(apiError("Failed to delete booking."));
            }
            if (result.affectedRows === 0) {
                return resp.status(404).send(apiError("Booking not found."));
            }
            resp.send(apiSuccess("Booking deleted successfully."));
        });
    });
});



module.exports=router;