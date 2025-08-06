const db = require("../utils/dbpool")
const {apiSuccess, apiError} = require("../utils/apiresult")
const {createToken} = require("../utils/jwtauth")
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
                db.query("insert into restaurants(Owner_id,name,document,location) value(?,?,?,?)",
                    [id,resto_name,documentname,location],(err,re)=>{
                    if(err)
                        return resp.send(apiError(err))
                    resp.send(apiSuccess({ message : "Restaurant registerd successfully", user_id: id }))
                })
            }   
        });
});

// Users.js
router.post("/upload-document/:userId", upload.single("document"), (req, resp) => {
    const userId = req.params.userId;
    const documentname = req.file ? req.file.filename : null;
    
    if (!documentname) {
        return resp.status(400).send(apiError("Document file not found"));
    }

    // You need to update the restaurants table, not the users table
    db.query("UPDATE restaurants SET document=? WHERE owner_id=?", [documentname, userId], (err, result) => {
        if (err) {
            return resp.status(500).send(apiError(err));
        }
        resp.send(apiSuccess("Document uploaded successfully"));
    });
});

router.post("/signup/user",(req,resp)=>{
     const {name,email,passwd,phone,role}=req.body
        const encPasswd = bcrypt.hashSync(passwd, 10)
        db.query("insert into users(name,email,password,phone,role) value(?,?,?,?,?)",[name,email,encPasswd,phone,role],(err,result)=>{
            if(err)
                return resp.send(apiError(err))
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

router.get("/userbyid/:id", (req, resp) => {
    const id = req.params.id;
    // Modified query to LEFT JOIN with restaurants to get resto_name and location if user is an owner
    const query = `
        SELECT 
            u.user_id, u.name, u.email, u.phone, u.role,
            r.name AS resto_name, r.location AS location
        FROM users u
        LEFT JOIN restaurants r ON u.user_id = r.Owner_id
        WHERE u.user_id = ?`;

    db.query(query, [id], (err, result) => {
       if (err) {
        console.error("Error fetching user by ID:", err);
        return resp.status(500).send(apiError("Failed to fetch user."));
       }
       if (result.length === 0) {
        return resp.status(404).send(apiError("User not found"));
       }
        resp.send(apiSuccess(result[0]));
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


router.put("/updatebyid/:id", (req, resp) => {
    const userId = req.params.id;
    const {name, email, phone, resto_name, location, role} = req.body; // Get role to conditionally update restaurant info

    // Update user table
    db.query("UPDATE users SET name=?, email=?, phone=? WHERE user_id=?",
        [name, email, phone, userId],
        (err, userResult) => {
            if (err) {
                console.error("Error updating user:", err);
                return resp.status(500).send(apiError("Failed to update user."));
            }

            // If the user is an owner, also update restaurant details
            if (role === 'owner') { // Check the role from the request body
                db.query("UPDATE restaurants SET name=?, location=? WHERE Owner_id=?",
                    [resto_name, location, userId],
                    (err, restoResult) => {
                        if (err) {
                            console.error("Error updating restaurant:", err);
                            return resp.status(500).send(apiError("Failed to update restaurant details."));
                        }
                        resp.send(apiSuccess("Profile and Restaurant details updated successfully"));
                    });
            } else {
                resp.send(apiSuccess("Profile updated successfully"));
            }
        });
});


module.exports = router