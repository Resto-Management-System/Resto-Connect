const db = require("../utils/dbpool")
const {apiSuccess, apiError} = require("../utils/apiresult")
const {createToken} = require("../utils/jwtauth")
const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router()

//add table
router.post("/",(req,resp)=>{
    const{resto_id,capacity,charge,category}=req.body;
    
    const query=`INSERT INTO  restaurant_tables(resto_id,capacity,charge,category)VALUES(?,?,?,?)`;
    db.query(query,[resto_id,capacity,charge,category],(err,result)=>{
        if(err)return resp.status(500).send(apiError(err));
        resp.send(apiSuccess({
            message:"Table added successfully",
            table_id:result.insertid
        }))
    })

})

//get table for specific restaurant

<<<<<<< HEAD
//router.get("/resto/")
=======

>>>>>>> dc1889c52f7d94cbfd0a1dd97bc22db51cdc61b8

module.exports=router;
