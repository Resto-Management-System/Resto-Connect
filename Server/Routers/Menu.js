const db = require("../Utils/dbpool")
const {apiSuccess, apiError} = require("../Utils/apiresult")
const {createToken} = require("../Utils/jwtauth")
const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router()

// Get all menu items for a specific restaurant
router.get("/restaurant/:resto_id/menu_items", (req, resp) => {
    const { resto_id } = req.params;

    const query = `SELECT * FROM menu_items WHERE resto_id = ?`;

    db.query(query, [resto_id], (err, result) => {
        if (err) return resp.status(500).send(apiError(err));
        resp.send(apiSuccess(result));
    });
});

// Add a new menu item to a restaurant
router.post("/restaurant/:resto_id/menu_items", (req, resp) => {
    const { resto_id } = req.params;
    const { item_name, price, category } = req.body;

    if (!item_name || !price || !category) {
        return resp.status(400).send(apiError("All fields are required"));
    }

    const query = `INSERT INTO menu_items (resto_id, item_name, price, category) VALUES (?, ?, ?, ?)`;

    db.query(query, [resto_id, item_name, price, category], (err, result) => {
        if (err) return resp.status(500).send(apiError(err));

        resp.send(apiSuccess({
            message: "Menu item added successfully",
            item_id: result.insertId
        }));
    });
});

// Update a menu item by item_id
router.put("/menu_items/:item_id", (req, resp) => {
    const { item_id } = req.params;
    const { item_name, price, category} = req.body;

    if (!item_name || !price || !category) {
        return resp.status(400).send(apiError("All fields are required"));
    }

    const query = `UPDATE menu_items SET item_name = ?, price = ?, category = ? WHERE item_id = ?`;

    db.query(query, [item_name, price, category, item_id], (err,result) => {
        if (err) return resp.status(500).send(apiError("Menu item not found"));

        resp.send(apiSuccess({
            message: "Menu item updated successfully"
        }));
    });
});

// Delete a menu item by item_id
router.delete("/menu_items/:item_id", (req, resp) => {
    const { item_id } = req.params;

    const query = `DELETE FROM menu_items WHERE item_id = ?`;
    db.query(query, [item_id], (err, result) => {
        if (err) return resp.status(500).send(apiError(err));

        if (result.affectedRows === 0)
            return resp.status(404).send(apiError("Menu item not found"));

        resp.send(apiSuccess({
            message: "Menu item deleted successfully"
        }));
    });
});
module.exports = router