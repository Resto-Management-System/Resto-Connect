const db = require("../utils/dbpool")
const {apiSuccess, apiError} = require("../utils/apiresult")
const {createToken} = require("../utils/jwtauth")
const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router()


router.post("/signup",(req,resp)=>{
    if(req.body.role=="Owner")
    {
        const {Name,email,passwd,phone,role,resto_name,document,location}=req.body
        const encPasswd = bcrypt.hashSync(passwd, 10)
        db.query("insert into users value(?,?,?,?,?)",[Name,email,encPasswd,phone,role],(err,result)=>{
            if(err)
                return resp.send(apiError(err))
            if(result.affectedRows==1){
                const id=result.insertId;
                db.query("insert into restaurants value(?,?,?,?)",[id,resto_name,document,location],(err,re)=>{
                    if(err)
                        return resp.send(apiError(err))
                    resp.send(apiSuccess("restaurant register successfully"))
                })
            }   
        })
    }else{
        const {Name,email,passwd,phone,role}=req.body
        const encPasswd = bcrypt.hashSync(passwd, 10)
        db.query("insert into users value(?,?,?,?,?)",[Name,email,encPasswd,phone,role],(err,result)=>{
            if(err)
                return resp.send(apiError(err))
            resp.send(apiSuccess("user register successfully"))
        })
    }
})

module.exports = router