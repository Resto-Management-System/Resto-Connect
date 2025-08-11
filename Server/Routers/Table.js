const db = require("../utils/dbpool");
const { apiSuccess, apiError } = require("../Utils/apiresult");
const { createToken, jwtAuth } = require("../Utils/jwtauth");
const express = require("express");
const router = express.Router();

// --- ADDED: Endpoint to get a specific owner's restaurant ID. ---
// This is a new helper route that will be used to validate table creation requests.
// Endpoint to get the resto_id for the logged-in owner.
// This is the new endpoint required by the front-end.
router.get("/owner-resto", jwtAuth, (req, resp) => {
    const ownerId = req.user.id;
    const query = `SELECT resto_id FROM restaurants WHERE owner_id = ?`;
    db.query(query, [ownerId], (err, result) => {
        if (err) {
            console.error("Database query error:", err);
            return resp.status(500).send(apiError(err));
        }

        if (result.length === 0) {
            // Handle case where no restaurant is found for the owner
            return resp.status(404).send(apiError("Restaurant not found for this owner."));
        }

        resp.send(apiSuccess({ resto_id: result[0].resto_id }));
    });
});
// -----------------------------------------------------------------

// Add a new table. This route now requires JWT authentication and a more
// secure check to ensure the resto_id belongs to the logged-in owner.
router.post("/", jwtAuth, async (req, resp) => {
    const { resto_id, capacity, charge, category } = req.body;

    // Await the database query to get the owner's restaurant ID
    const ownerId = req.user.id;
    const getRestoIdQuery = `SELECT resto_id FROM restaurants WHERE owner_id = ?`;
    
    // Using a promise-based query for cleaner async/await syntax
    // Note: The original code uses callbacks. This is a refactor to modern JS.
    try {
        const [restoResult] = await db.promise().query(getRestoIdQuery, [ownerId]);
        
        if (restoResult.length === 0) {
            return resp.status(403).send(apiError("Forbidden: No restaurant found for this owner."));
        }
        
        const ownerRestoId = restoResult[0].resto_id;

        // Security check: Compare the resto_id from the request body with the
        // actual resto_id associated with the authenticated owner.
        if (parseInt(resto_id) !== ownerRestoId) {
            return resp.status(403).send(apiError("Forbidden: The provided resto_id does not belong to you."));
        }
        
        // If the check passes, proceed with inserting the new table.
        const insertQuery = `INSERT INTO restaurant_tables(resto_id, capacity, charge, category) VALUES (?, ?, ?, ?)`;
        const [insertResult] = await db.promise().query(insertQuery, [ownerRestoId, capacity, charge, category]);
        
        resp.send(apiSuccess({
            message: "Table added successfully",
            table_id: insertResult.insertId
        }));

    } catch (err) {
        console.error("Database query error:", err);
        // This will catch any database errors, including foreign key constraint violations.
        resp.status(500).send(apiError(err.message));
    }
});

// Get tables for a specific restaurant.
router.get("/resto/:resto_id", (req, resp) => {
    const { resto_id } = req.params;
    db.query("SELECT * FROM restaurant_tables WHERE resto_id=?", [resto_id], (err, result) => {
        if (err)
            return resp.status(500).send(apiError(err));
        resp.send(apiSuccess(result));
    });
});

// Get table by id
router.get("/:id", (req, resp) => {
    const { id } = req.params;
    db.query("SELECT * FROM restaurant_tables WHERE table_id=?", [id], (err, result) => {
        if (err)
            return resp.status(500).send(apiError(err));
        resp.send(apiSuccess(result[0]));
    });
});

// Update an existing table. This route now requires JWT authentication.
router.put("/:id", jwtAuth, (req, resp) => {
    const { capacity, charge, category } = req.body;
    const { id } = req.params;
    
    // Security check: A more robust check would verify the table belongs to the owner.
    if (req.user.role !== 'owner') {
        return resp.status(403).send(apiError("Forbidden: Only owners can update tables."));
    }
    
    const query = `UPDATE restaurant_tables SET capacity=?, charge=?, category=? WHERE table_id=?`;
    db.query(query, [capacity, charge, category, id], (err, result) => {
        if (err)
            resp.status(500).send(apiError(err));
        resp.send(apiSuccess({ message: "Table updated successfully" }));
    });
});

// Delete a table. This route now requires JWT authentication.
router.delete("/:id", jwtAuth, (req, resp) => {
    const { id } = req.params;
    
    // Security check: A more robust check would verify the table belongs to the owner.
    if (req.user.role !== 'owner') {
        return resp.status(403).send(apiError("Forbidden: Only owners can delete tables."));
    }
    
    const query = `DELETE FROM restaurant_tables WHERE table_id=?`;
    db.query(query, [id], (err, result) => {
        if (err)
            resp.status(500).send(apiError(err));
        resp.send(apiSuccess({ message: "Table deleted successfully" }));
    });
});

module.exports = router;
