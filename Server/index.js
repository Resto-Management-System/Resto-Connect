const express=require("express");
const app = express();
const cors =require("cors");
const {jwtAuth}=require("./utils/jwtauth")
const userRouter=require("./Routers/Users")
const restoRouter=require("./Routers/Resto")
const tableRouter=require("./Routers/Table")
<<<<<<< HEAD
const jwtauth = require("./utils/jwtauth");
=======
<<<<<<< HEAD
const menuRouter=require("./Routers/Menu")
=======
const adminRouter=require("./Routers/Admin")
>>>>>>> dc1889c52f7d94cbfd0a1dd97bc22db51cdc61b8
>>>>>>> c7474c7c2f01c87533f1adb0503bb6154306704e

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
<<<<<<< HEAD


app.use("/users",userRouter);
=======
//app.use(jwtAuth);
app.use("/user",userRouter);
>>>>>>> c7474c7c2f01c87533f1adb0503bb6154306704e
app.use("/resto",restoRouter);
app.use("/table",tableRouter);
<<<<<<< HEAD
app.use("/api", menuRouter);
=======
app.use("/admin",adminRouter);
>>>>>>> dc1889c52f7d94cbfd0a1dd97bc22db51cdc61b8


app.use('/Upload', express.static('Upload'));


// Basic root route (optional)
app.get('/', (req, res) => {
    res.send('Restaurant Management System Backend is running!');
});

app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging
    res.status(500).send('Something broke on the server!'); // Send a generic error response
});


const port = 3000;
app.listen(port, "0.0.0.0", () => {
	console.log("server ready at port", port);
});