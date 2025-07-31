const db = require("../Utils/dbpool")
const {apiSuccess, apiError} = require("../Utils/apiresult")
const {createToken} = require("../Utils/jwtauth")
const express = require("express")
const bcrypt = require("bcrypt")
const multer = require("multer");
const router = express.Router()
const upload = multer({dest: "Upload/"})


router.post("/signup/owner",upload.single("document"),(req,resp)=>{
        const {name,email,passwd,phone,role,resto_name,location}=req.body
        const documentname = req.file ? req.file.filename : null;
        const encPasswd = bcrypt.hashSync(passwd, 10)
        db.query("insert into users(name,email,password,phone,role) value(?,?,?,?,?)",[name,email,encPasswd,phone,role],(err,result)=>{
            if(err)
                return resp.send(apiError(err))
            if(result.affectedRows==1){
                const id=result.insertId;
                db.query("insert into restaurants(Owner_id,name,document,location) value(?,?,?,?)",[id,resto_name,documentname,location],(err,re)=>{
                    if(err)
                        return resp.send(apiError(err))
                    resp.send(apiSuccess("restaurant register successfully"))
                })
            }   
        })
})

router.post("/signup/user",(req,resp)=>{
     const {name,email,passwd,phone,role}=req.body
        const encPasswd = bcrypt.hashSync(passwd, 10)
        db.query("insert into users(name,email,password,phone,role) value(?,?,?,?,?)",[name,email,encPasswd,phone,role],(err,result)=>{
            if(err)
                return resp.send(apiError(err))
            if(result.affectedRows !==1)
                return resp.send(apiError("user not added"))
            console.log(result)
            resp.send(apiSuccess("user register successfully"))
        })
})

router.post("/signin",(req,resp)=>{
    const {email,passwd}=req.body
    db.query("SELECT * FROM users WHERE email=?",[email],(err,result)=>{
        if(err)
            return resp.send(apiError(err))
            //console.log("results: ", result)
        if(result.length !== 1) // user with email not found
            return resp.send(apiError("Invalid email"))
        const dbUser = result[0]
        const isMatching = bcrypt.compareSync(passwd, dbUser.password)
            //console.log("is passwd matching: " , isMatching)
        if(!isMatching) // password not matching
            return resp.send(apiError("Invalid password"))
            // create jwt token and add it in response
        const token = createToken(dbUser)
        resp.send(apiSuccess(token))
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

router.delete("/deleteuserbyid/:id",(req,resp)=>{
    db.query("DELETE FROM users WHERE user_id=?",[req.params.id],(err,result)=>{
        if(err)
            return resp.send(apiError(err));
        resp.send(apiSuccess("user deleted successfully"));

    });
});

//update user api

router.patch("/updatebyid/:id",(req,resp)=>{
    const{name,email,phone}=req.body;
    db.query("UPDATE users SET name=? ,email=?,phone=?,WHERE user_id=?",
        [name,email,phone,req.params.id],
        (err,result)=>{
            if(err)return resp.send(apiError(err));
            resp.send(apiSuccess("user updated successfully"));

        });
    
});


module.exports = router