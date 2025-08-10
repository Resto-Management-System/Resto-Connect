const db = require("../utils/dbpool")
const {apiSuccess, apiError} = require("../Utils/apiresult")
const {createToken} = require("../Utils/jwtauth")
const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router()

// block restaurants
router.get("/block/resto",(req,resp)=>{
    db.query("select * from restaurants where is_blocked=1",(err,result)=>{
        if(err)
            return resp.send(apiError(err))
        resp.send(apiSuccess(result))
    })
})

//block this restaurant
router.patch("/block/:id",(req,resp)=>{
    const resto_id=req.params.id
    db.query("update restaurants set is_blocked=1 where resto_id=?",[resto_id],(err,result)=>{
        if(err)
            return resp.send(apiError(err))
        if(result.affectedRows!=1)
            return resp.send(apiError("resto is not found"))
        resp.send(apiSuccess("resturant is blocked"))
    })
})

//applyed restaurants
router.get("/apply/resto",(req,resp)=>{
    db.query("select * from restaurants where is_verify=0 and is_blocked=0",(err,result)=>{
        if(err)
            return resp.send(apiError(err))
        resp.send(apiSuccess(result))
    })
})

router.patch("/verify/:id",(req,resp)=>{
    const resto_id=req.params.id
    db.query("update restaurants set is_verify=1 where resto_id=?",(err,result)=>{
        if(err)
            return resp.send(apiError(err))
        if(result.affectedRows!=1)
            return resp.send(apiError("restaurant is not found"))
        resp.send(apiSuccess("restaurant verify"))

    })
})




module.exports=router;