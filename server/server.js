const express  =require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const placeAdminRouter = require('./routes/placeAdminRoutes.js')
const Tourist = require('./routes/touristRoutes.js')
const cookieParser = require("cookie-parser");
const bodyParser=  require("body-parser")



// database connection
require('./config/db.js').connect();


app.use(cookieParser());
app.use(bodyParser.json({extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//for using upload folder

app.use('/uploads',express.static('uploads'));

// Routing
app.use("/dom", placeAdminRouter);
app.use("/tourist", Tourist);

app.listen(process.env.PORT ,() =>{
   console.log(`server is running on port ${process.env.PORT}`)
})
