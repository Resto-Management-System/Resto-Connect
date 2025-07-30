const express=require("express");
const app = express();
const cors =require("cors");
const {jwtAuth}=require("./Utils/jwtauth")
const userRouter=require("./Routers/Users")
const restoRouter=require("./Routers/Resto")
const tableRouter=require("./Routers/Table")
<<<<<<< HEAD
const menuRouter=require("./Routers/Menu")
const adminRouter= require("./Routers/Admin")
=======


const reviewRouter = require("./Routers/Review")
const menuRouter=require("./Routers/Menu")
const adminRouter=require("./Routers/Admin")
>>>>>>> 4c426f4a534c3fbf92a806bf6338abea1ec3373e

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(jwtAuth);
app.use("/user",userRouter);
app.use("/resto",restoRouter);
app.use("/table",tableRouter);
app.use("/api", menuRouter);
app.use("/admin",adminRouter);
<<<<<<< HEAD

=======
app.use("/review", reviewRouter);
>>>>>>> 4c426f4a534c3fbf92a806bf6338abea1ec3373e


const port = 3000;
app.listen(port, "0.0.0.0", () => {
	console.log("server ready at port", port);
});