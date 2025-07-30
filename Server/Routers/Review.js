<<<<<<< HEAD
const db = require("../utils/dbpool")
const {apiSuccess, apiError} = require("../utils/apiresult")
const {createToken} = require("../utils/jwtauth")
const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router()

// add review

module.exports=router;
=======
const express = require("express");
const router = express.Router();
const db = require("../Utils/dbpool");
const { apiSuccess, apiError } = require("../Utils/apiresult");

// Add a review
router.post("/", (req, res) => {
    const { customer_id, resto_id, comment, rating } = req.body;
    
    if (!customer_id || !resto_id || !rating) {
        return res.status(400).send(apiError("Required fields missing"));
    }

    if (rating < 1 || rating > 5) {
        return res.status(400).send(apiError("Rating must be between 1 and 5"));
    }

    const query = `INSERT INTO reviews (customer_id, resto_id, comment, rating) VALUES (?, ?, ?, ?)`;

    db.query(query, [customer_id, resto_id, comment, rating], (err, result) => {
        if (err) return res.status(500).send(apiError(err));

        res.send(apiSuccess({
            message: "Review added succesfully",
            review_id: result.insertId
        }));
    });
});

// Get all reviews for a restaurant
router.get("/restaurant/:resto_id", (req, res) => {
    const { resto_id } = req.params;

    const query = `
        SELECT r.review_id, r.comment, r.rating, u.name AS customer_name
        FROM reviews r
        JOIN users u ON r.customer_id = u.user_id
        WHERE r.resto_id = ?
    `;

    db.query(query, [resto_id], (err, result) => {
        if (err) return res.status(500).send(apiError(err));
        res.send(apiSuccess(result));
    });
});

module.exports = router;
>>>>>>> 4c426f4a534c3fbf92a806bf6338abea1ec3373e
