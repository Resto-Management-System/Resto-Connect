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
        //const encPasswd = bcrypt.hashSync(passwd, 10)
        db.query("insert into users(name,email,password,phone,role) value(?,?,?,?,?)",[Name,email,passwd,phone,role],(err,result)=>{
            if(err)
                return resp.send(apiError(err))
            if(result.affectedRows==1){
                const id=result.insertId;
                db.query("insert into restaurants(Owner_id,name,document,location) value(?,?,?,?)",[id,resto_name,document,location],(err,re)=>{
                    if(err)
                        return resp.send(apiError(err))
                    resp.send(apiSuccess("restaurant register successfully"))
                })
            }   
        })
    }else{
        const {Name,email,passwd,phone,role}=req.body
        //const encPasswd = bcrypt.hashSync(passwd, 10)
        db.query("insert into users(name,email,password,phone,role) value(?,?,?,?,?)",[Name,email,passwd,phone,role],(err,result)=>{
            if(err)
                return resp.send(apiError(err))
            resp.send(apiSuccess("user register successfully"))
        })
})

router.post("/signin",(req,resp)=>{
    const {email,passwd}=req.body
    db.query("SELECT user_id,role FROM users WHERE email=? and password=?",[email,passwd],(err,result)=>{
        if (err) 
            return resp.send(apiError(err))
        if(result.length!==1)
            return resp.send(apiError("invalid credential"))
        resp.send(apiSuccess(result[0]))
    })
})


//get userbyid api

router.get("/userbyid/:id",(req,resp)=>{
    const id =req.params.id;
    db.query("SELECT user_id,name,email,phone,role FROM users WHERE user_id=?",[id],(err,result)=>{
       if(err)
        return resp.send(apiError(err));
       if(result.length===0)
        //console.log("Requested ID-", req.params.id);
        return resp.send(apiError("user not found"));
        resp.send(apiSuccess(result[0]))
    });
});

//get alluser api

router.get("/getallusers",(req,resp)=>{
    db.query("SELECT user_id,name,email,phone,role FROM users ",(err,result)=>{
        if(err)
            return resp.send(apiError(err));
        resp.send(apiSuccess(result));

    });
});

//delete userbyid api

router.delete("/deleteuserbyid",(req,resp)=>{
    db.query("DELETE FROM users WHERE user_id=?",[req.params.id],(err,result)=>{
        if(err)
            return resp.send(apiError(err));
        resp.send(apiSuccess("user deleted successfully"));

    });
});

//update user api

router.put("/updatebyid",(req,resp)=>{
    const{name,email,phone}=req.body;
    db.query("UPDATE users SET name=? ,email=?,phone=?,WHERE user_id=?",
        [name,email,phone,req.params.id],
        (err,result)=>{
            if(err)return resp.send(apiError(err));
            resp.send(apiSuccess("user updated successfully"));

        });
    
});


module.exports = router