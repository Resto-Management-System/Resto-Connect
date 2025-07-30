const db = require("../Utils/dbpool")
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
            //console.log(result2)
            resp.send(apiSuccess(result2))
        })
    })
})

//add table
router.post("/",(req,resp)=>{
    const id =req.user.id
    const{capacity,charge,category}=req.body;
    db.query("Select * from restaurants where owner_id=?",[id],(err,result)=>{
        if(err)
            return resp.send(apiError(err))
        db.query("INSERT INTO  restaurant_tables(resto_id,capacity,charge,category)VALUES(?,?,?,?)",[result[0].resto_id,capacity,charge,category],(err,result2)=>{
            if(err)
                return resp.send(apiError(err))
            if(result2.affectedRows==0)
                return resp.send(apiError("table not add"))
            resp.send(apiSuccess("table added successfully"))
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

//update resto

router.put("/:id",(req,resp)=>{
    const{name,location,rating,category}=req.body;
    const{id}=req.params;

    const query=`UPDATE restaurants SET name=?,location=?,rating=?,category=? WHERE restaurant_id=?`;
    db.query(query,[name,location,rating,category,id],(err,result)=>{
        if(err)
            resp.send(apiSuccess({message:"Restaurant updated successfully"}));

    })
})



module.exports=router;