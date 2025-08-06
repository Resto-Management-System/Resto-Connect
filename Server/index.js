const express=require("express");
const app = express();
const cors =require("cors");
const {jwtAuth}=require("./utils/jwtauth")
const userRouter=require("./Routers/Users")
const restoRouter=require("./Routers/Resto")
const tableRouter=require("./Routers/Table")


const menuRouter=require("./Routers/Menu")

const adminRouter=require("./Routers/Admin")


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(jwtAuth);
app.use("/users",userRouter);
app.use("/resto",restoRouter);
app.use("/table",tableRouter);
app.use("/admin",adminRouter);


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