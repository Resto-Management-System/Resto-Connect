const express=require("express");
const app = express();
const cors =require("cors");
const userRouter=require("./Routers/Users")

app.use(cors());
app.use(express.json());
app.use("/user",userRouter);


const port = 3000;
app.listen(port, "0.0.0.0", () => {
	console.log("server ready at port", port);
});