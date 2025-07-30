const db = require("../Utils/dbpool")
const {apiSuccess, apiError} = require("../Utils/apiresult")
const {createToken} = require("../Utils/jwtauth")
const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router()



//get tables for specific restaurant
router.get("/resto/:resto_id",(req,resp)=>{
    const {resto_id}=req.params;
    db.query("SELECT * FROM restaurant_tables WHERE resto_id=?",[resto_id],(err,result)=>{
        if(err)
        return resp.status(500).send(apiError(err));
        resp.send(apiSuccess(result));

    })
})

//get table by id

router.get("/:id",(req,resp)=>{
    const {id}=req.params;
    db.query("SELECT * FROM restaurant_tables table_id=?",[id],(err,result)=>{
        if (err)
            return resp.status(500).send(apiError(err));
            resp.send(apiSuccess(result[0]));

    })
})


//update table

router.patch("/:id", (req, resp) => {
    const { capacity, charge, category } = req.body;
    const { id } = req.params;

    const query = `
        UPDATE restaurant_tables
        SET capacity = ?, charge = ?, category = ?
        WHERE table_id = ?`;

    db.query(query, [capacity, charge, category, id], (err, result) => {
        if (err) {
            return resp.status(500).send(apiError(err));  // ✅ return added
        }

        // Optional: check if any row was actually updated
        if (result.affectedRows === 0) {
            return resp.status(404).send(apiError("No table found with this ID"));  // ✅ safe fallback
        }
        console.log(result)
        return resp.send(apiSuccess({ message: "Table updated successfully" }));
    });
});


//delete table

router.delete("/:id",(req,resp)=>{
    const{id}=req.params;
    console.log(id)
    db.query("DELETE FROM restaurant_tables WHERE table_id=?",[id],(err,result)=>{
        if(err)
            return resp.status(500).send(apiError(err));
            resp.send(apiSuccess({message:"Table deleted successfully"}));

            })
    })

//router.get("/resto/")


module.exports=router;
