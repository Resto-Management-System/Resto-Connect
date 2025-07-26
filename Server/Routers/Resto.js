const db = require("../utils/dbpool")
const {apiSuccess, apiError} = require("../utils/apiresult")
const {createToken} = require("../utils/jwtauth")
const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router()


// Get all restaurants
router.get("/", (req, resp) => {
    const query = `SELECT * FROM restaurants`;

    db.query(query, (err, result) => {
        if (err) return resp.status(500).send(apiError(err));
        resp.send(apiSuccess(result));
    });
});

//register resto

router.post("/",(req,resp)=>{
     const {owner_id,name,document,location}=req.body;
     const query=
     `INSERT INTO restaurants (owner_id,name,document,location)
     VALUES(?,?,?,?)`;

     db.query(query,[owner_id,name,document,location],(err,result)=>{
        if(err)
            return resp.status(500).send(apiError(err));
        resp.send(apiSuccess({
            message:"Restaurant registered successfully",
            restaurant_id:result.insertId
        }))
     })

})

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

//update resto

router.put("/:id",(req,res)=>{
    const{name,location,rating,category}=req.body;
    const{id}=req.params;

    const query=`UPDATE restaurants SET name=?,location=?,rating=?,category=? WHERE restaurant_id=?`;
    db.query(query,[name,location,rating,category,id],(err,result)=>{
        if(err)
            resp.send(apiSuccess({message:"Restaurant updated successfully"}));

    })
})

//delete resto

router.delete("/:id",(req,resp)=>{
    const{id}=req.params;

    db.query("DELETE FROM restaurants WHERE restaurant_id=?",[id],(err,result)=>{
     if(err)
        return res.status(500).send(apiError(err));
        resp.send(apiSuccess({message:"Restaurant deleted successfully"}));
    })
})

module.exports=router;