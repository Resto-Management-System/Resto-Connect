const express=require("express");
const app = express();
const cors =require("cors");
const {jwtAuth}=require("./utils/jwtauth")
const userRouter=require("./Routers/Users")
const restoRouter=require("./Routers/Resto")
const tableRouter=require("./Routers/Table")
<<<<<<< HEAD
const menuRouter=require("./Routers/Menu")
=======
const adminRouter=require("./Routers/Admin")
>>>>>>> dc1889c52f7d94cbfd0a1dd97bc22db51cdc61b8

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(jwtAuth);
app.use("/user",userRouter);
app.use("/resto",restoRouter);
app.use("/table",tableRouter);
<<<<<<< HEAD
app.use("/api", menuRouter);
=======
app.use("/admin",adminRouter);
>>>>>>> dc1889c52f7d94cbfd0a1dd97bc22db51cdc61b8


const port = 3000;
app.listen(port, "0.0.0.0", () => {
	console.log("server ready at port", port);
});