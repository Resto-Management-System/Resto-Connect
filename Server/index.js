const express=require("express");
const app = express();
const cors =require("cors");
const {jwtAuth}=require("./Utils/jwtauth")
const userRouter=require("./Routers/Users")
const restoRouter=require("./Routers/Resto")
const tableRouter=require("./Routers/Table")
const menuRouter=require("./Routers/Menu")
<<<<<<< HEAD
=======
const adminRouter= require("./Routers/Admin")


const reviewRouter = require("./Routers/Review")
//const menuRouter=require("./Routers/Menu")
>>>>>>> ca7d040396532d417ba3dea9efa3a57359ab276d
const adminRouter=require("./Routers/Admin")

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(jwtAuth);
app.use("/user",userRouter);
app.use("/resto",restoRouter);
app.use("/table",tableRouter);
<<<<<<< HEAD
app.use("/", menuRouter);
app.use("/admin",adminRouter);
=======
app.use("/api", menuRouter);
app.use("/admin",adminRouter);

app.use("/review", reviewRouter);
>>>>>>> ca7d040396532d417ba3dea9efa3a57359ab276d


const port = 3000;
app.listen(port, "0.0.0.0", () => {
	console.log("server ready at port", port);
});