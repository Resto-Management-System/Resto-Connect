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

router.get("/",(req,resp)=>{
    const id =req.user.id;
    db.query("SELECT user_id,name,email,phone,role FROM users WHERE user_id=?",[id],(err,result)=>{
        if(err)
            return resp.send(apiError(err))
        if(result.length==0)
            return resp.send(apiError("user not found"))
        //console.log(result[0])
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

router.post("/order/:resto_id", (req, resp) => {
    const user_id = req.user.id;
    const resto_id = req.params.resto_id;
    const { tableList, menuList, start_time, end_time,charge,price, total_amount } = req.body;

    // Extract table_ids as JSON array
    const tableIds = tableList.map(t => t.table_id);
    const tableIdsJson = JSON.stringify(tableIds);

    db.getConnection((err, connection) => {
        if (err) return resp.send(apiError(err));

        connection.beginTransaction(err => {
            if (err) {
                connection.release();
                return resp.send(apiError(err));
            }

            // 1️⃣ Insert into bookings
            connection.query(
                `INSERT INTO bookings (customer_id, resto_id, table_ids, start_time, end_time, status) 
                 VALUES (?, ?, CAST(? AS JSON), ?, ?, 'Booked')`,
                [user_id, resto_id, tableIdsJson, start_time, end_time],
                (err, bookingResult) => {
                    if (err) {
                        return connection.rollback(() => {
                            connection.release();
                            resp.send(apiError(err));
                        });
                    }

                    const booking_id = bookingResult.insertId;

                    // 2️⃣ Insert into orders
                    connection.query(
                        `INSERT INTO orders (booking_id, order_time, status) 
                         VALUES (?, NOW(), 'Pending')`,
                        [booking_id],
                        (err, orderResult) => {
                            if (err) {
                                return connection.rollback(() => {
                                    connection.release();
                                    resp.send(apiError(err));
                                });
                            }

                            const order_id = orderResult.insertId;

                            // 3️⃣ Insert into order_details
                            const orderDetailsValues = menuList.map(item => [
                                order_id,
                                item.item_id,
                                item.quantity
                            ]);

                            connection.query(
                                `INSERT INTO order_details (order_id, item_id, quantity) VALUES ?`,
                                [orderDetailsValues],
                                (err) => {
                                    if (err) {
                                        return connection.rollback(() => {
                                            connection.release();
                                            resp.send(apiError(err));
                                        });
                                    }

                                    // 4️⃣ Insert into bills
                                    connection.query(
                                        `INSERT INTO bills (order_id, table_charge, items_total, total_amount, status) 
                                         VALUES (?, ?, ?, ?, 'Unpaid')`,
                                        [order_id,charge,price, total_amount],
                                        (err) => {
                                            if (err) {
                                                return connection.rollback(() => {
                                                    connection.release();
                                                    resp.send(apiError(err));
                                                });
                                            }

                                            // ✅ Commit transaction
                                            connection.commit(err => {
                                                if (err) {
                                                    return connection.rollback(() => {
                                                        connection.release();
                                                        resp.send(apiError(err));
                                                    });
                                                }

                                                connection.release();
                                                resp.send(apiSuccess("Order and bill created successfully"));
                                            });
                                        }
                                    );
                                }
                            );
                        }
                    );
                }
            );
        });
    });
});

router.get("/orders",(req,resp)=>{
    const id=req.user.id
     const sql='SELECT b.booking_id ,b.resto_id, b.table_ids, b.start_time, b.end_time, b.status AS booking_status, r.name AS restaurant_name, r.location AS restaurant_location, o.order_id, od.detail_id, od.item_id, mi.item_name, mi.price, mi.category AS menu_category, od.quantity, rt.table_id, rt.capacity AS table_capacity, rt.charge AS table_charge, rt.category AS table_category, bl.bill_id, bl.table_charge, bl.items_total, bl.total_amount, bl.status AS bill_status FROM bookings b JOIN restaurants r ON b.resto_id = r.resto_id LEFT JOIN orders o ON b.booking_id = o.booking_id LEFT JOIN order_details od ON o.order_id = od.order_id LEFT JOIN menu_items mi ON od.item_id = mi.item_id LEFT JOIN bills bl ON o.order_id = bl.order_id LEFT JOIN restaurant_tables rt ON JSON_CONTAINS(b.table_ids, CAST(rt.table_id AS JSON)) WHERE b.customer_id = ?'
      db.query(sql,[id],(err,result)=>{
    if(err)
        return resp.send(apiError(err))
    console.log(result)
    resp.send(apiSuccess(result))
})
});


module.exports = router