const express=require("express");
const app = express();
const cors =require("cors");
const userRouter=require("./Routers/Users")
const restoRouter=require("./Routers/Resto")
const tableRouter=require("./Routers/Table")

app.use(cors());
app.use(express.json());
app.use("/user",userRouter);
app.use("/resto",restoRouter);
app.use("/table",tableRouter);


const port = 3000;
app.listen(port, "0.0.0.0", () => {
	console.log("server ready at port", port);
});