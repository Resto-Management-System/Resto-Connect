const db = require("../utils/dbpool")
const {apiSuccess, apiError} = require("../Utils/apiresult")
const {createToken, jwtAuth} = require("../Utils/jwtauth")
const express = require("express")
const bcrypt = require("bcrypt")
const multer = require("multer");
const router = express.Router()

// These users will bypass the database check.
const admins = [
    { email: 'nishi@gmail.com', password: 'admin1', user_id: 101 },
    { email: 'aditya@gmail.com', password: 'admin2', user_id: 102 },
    { email: 'sojwal@gmail.com', password: 'admin3', user_id: 103 },
    { email: 'madhura@gmail.com', password: 'admin4', user_id: 104 }
];

//--add multer for file uploads------
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });


router.post("/signup/owner", upload.single("document"), (req, resp) => {
    const { name, email, passwd, phone, role, resto_name, location } = req.body;

    if (!name || !email || !passwd || !resto_name || !location) {
        return resp.status(400).send(apiError("Missing required fields"));
    }

    const documentname = req.file ? req.file.filename : null;
    const encPasswd = bcrypt.hashSync(passwd, 10);

    db.query("INSERT INTO users(name,email,password,phone,role) VALUES (?,?,?,?,?)",
        [name, email, encPasswd, phone, role], (err, result) => {

            if (err) return resp.send(apiError(err));

            const id = result.insertId;

            db.query("INSERT INTO restaurants(owner_id, name, license_document, location) VALUES (?, ?, ?, ?)",
                [id, resto_name, documentname, location], (err2, result2) => {

                    if (err2) return resp.send(apiError(err2));
                    resp.send(apiSuccess({ message: "Restaurant registered successfully", user_id: id }));
                });
        });
});

// Users.js ---document upload route
router.post("/upload-document/:userId", upload.fields([
    { name: "license", maxCount: 1 },
    { name: "idCard", maxCount: 1 },
    { name: "menu", maxCount: 1 },
    { name: "restaurantImages", maxCount: 10 },
]), (req, res) => {
    const userId = req.params.userId;
    if (!req.files) return res.status(400).send(apiError("No files uploaded."));

    const license = req.files.license?.[0]?.filename || null;
    const idCard = req.files.idCard?.[0]?.filename || null;
    const menu = req.files.menu?.[0]?.filename || null;
    const restaurantImages = req.files.restaurantImages?.map(f => f.filename) || [];

    db.query(
        `UPDATE restaurants 
         SET license_document = ?, id_card_document = ?, menu_document = ?, restaurant_images = ? 
         WHERE owner_id = ?`,
        [license, idCard, menu, JSON.stringify(restaurantImages), userId],
        (err, result) => {
            if (err) {
                console.error("DB error:", err);
                return res.status(500).send(apiError("Database error"));
            }
            if (result.affectedRows === 0) {
                return res.status(404).send(apiError("Restaurant not found"));
            }
            res.send(apiSuccess({ message: "Documents uploaded successfully" }));
        }
    );
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

//--------------- User Sign-in API ---------------

router.post("/signin", (req, resp) => {
    const { email, passwd } = req.body;

    // Check for admin first
    const adminUser = admins.find(admin => admin.email === email && admin.password === passwd);

    if (adminUser) {
        const user = {
            user_id: adminUser.user_id,
            name: email.split('@')[0], // or a proper name if you want
            email: adminUser.email,
            role: 'admin'
        };
        const token = createToken(user);
        return resp.send(apiSuccess({ token, user }));
    }

    // For non-admins, fetch from DB
    db.query("SELECT user_id, name, email, phone, role, password FROM users WHERE email=?", [email], (err, result) => {
        if (err) return resp.send(apiError(err));
        if (result.length == 0) return resp.send(apiError("Invalid login credentials"));

        const dbUser = result[0];

        if (bcrypt.compareSync(passwd, dbUser.password)) {
            // Remove password before sending
            delete dbUser.password;
            const token = createToken(dbUser);
            resp.send(apiSuccess({ token, user: dbUser }));
        } else {
            resp.send(apiError("Invalid login credentials"));
        }
    });
});


// router.post("/signin", (req, resp) => {
//     const { email, passwd } = req.body;

//     const adminUser = admins.find(admin => admin.email === email && admin.password === passwd);

//     // --- COMBINED ADMIN/OWNER LOGIN LOGIC ---
//     // First, check for the hardcoded admin credentials.
//     if (adminUser) {
//         // If an admin match is found, create a token with their info and return.
//         const user = { user_id: adminUser.user_id, role: 'admin' };
//         const token = createToken(user);
//         return resp.send(apiSuccess({ token, user }));
//     }

//     // If not the admin, proceed with the regular database query for other roles (owner, customer)
//     db.query("SELECT * FROM users WHERE email=?", [email], (err, result) => {
//         if (err) return resp.send(apiError(err));
//         if (result.length == 0) return resp.send(apiError("invalid login credentials"));

//         const user = result[0];
//         // Compare the provided password with the hashed password from the database
//         if (bcrypt.compareSync(passwd, user.password)) {
//             const token = createToken(user);
//             resp.send(apiSuccess({ token, user }));
//         } else {
//             resp.send(apiError("invalid login credentials"));
//         }
//     });
// });

//get userbyid api

router.get("/profile/:id", jwtAuth, (req, resp) => {
    const id = req.user.id;
    // Modified query to LEFT JOIN with restaurants to get resto_name and location if user is an owner
    const query = `
        SELECT 
            u.user_id, u.name, u.email, u.phone, u.role,
            r.name AS resto_name, r.location AS location
        FROM users u
        LEFT JOIN restaurants r ON u.user_id = r.Owner_id
        WHERE u.user_id = ?`;

    db.query(query, [userId], (err, result) => {
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
    db.query("DELETE FROM users WHERE user_id=?", [req.params.id],(err,result)=>{
        if(err)
            return resp.send(apiError(err));
        resp.send(apiSuccess("user deleted successfully"));

    });
});

//update user api

// router.put("/updatebyid",(req,resp)=>{
//     const{name,email,phone}=req.body;
//     db.query("UPDATE users SET name=? ,email=?,phone=?,WHERE user_id=?",
//         [name,email,phone,req.params.id],
//         (err,result)=>{
//             if(err)return resp.send(apiError(err));
//             resp.send(apiSuccess("user updated successfully"));

//         });
    
// });


// New PUT route to update owner profile.
// This is a protected route.
router.put("/updateprofile", jwtAuth, (req, res) => {
  const userId = req.user.id;
  const { name, phone, resto_name, location } = req.body;

  // Update user details
  const userUpdateQuery = `
    UPDATE users
    SET name = ?, phone = ?
    WHERE user_id = ?;
  `;
  db.query(userUpdateQuery, [name, phone, userId], (err, userResult) => {
    if (err) {
      console.error("Error updating user profile:", err);
      return res.status(500).send(apiError("Failed to update user profile."));
    }

    // Now, update restaurant details (only if the user is an owner)
    // We get the role from the JWT token via jwtAuth middleware.
    if (req.user.role === 'owner') {
      const restoUpdateQuery = `
        UPDATE restaurants
        SET resto_name = ?, location = ?
        WHERE owner_id = ?;
      `;
      db.query(restoUpdateQuery, [resto_name, location, userId], (err, restoResult) => {
        if (err) {
          console.error("Error updating restaurant details:", err);
          return res.status(500).send(apiError("Failed to update restaurant details."));
        }
        return res.send(apiSuccess("Profile updated successfully."));
      });
    } else {
      // If the user is not an owner, we just send a success message after updating their user profile.
      return res.send(apiSuccess("Profile updated successfully."));
    }
  });
});


//----------------------------
//update user api - consolidated into one correct route
router.put("/updatebyid/:id", (req, resp) => {
    const userId = req.params.id;
    const { name, email, phone, resto_name, location, role } = req.body;

    db.query("UPDATE users SET name=?, email=?, phone=? WHERE user_id=?",
        [name, email, phone, userId],
        (err, userResult) => {
            if (err) {
                console.error("Error updating user:", err);
                return resp.status(500).send(apiError("Failed to update user."));
            }
            if (role === 'owner') {
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