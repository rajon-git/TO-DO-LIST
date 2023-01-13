const {readdirSync}=require("fs");
const path=require("path");
const express=require("express");
const app=express();
const helmet=require("helmet");
const cors=require("cors");
const mongoose=require("mongoose");
const morgan=require("morgan");
const cookieParser=require("cookie-parser");
const { json, urlencoded } = require("express");
require("dotenv").config();
// const errorHandler=require("./middlewares/errorMiddleware");


//middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.urlencoded({extended:false}));
//app.use("/uploads",express.static(path.join(_dirname,"uploads")));

//routes middleware
readdirSync("./routes").map(r=> app.use("/api/v1",require(`./routes/${r}`)));

//server
const port=process.env.PORT||8000;

//DB connection

mongoose.connect(process.env.DATABASE)
        .then(()=>{
            app.listen(port,()=>{
                console.log(`App is running on port ${port}`);
            });
        })
        .catch((error) => console.log(error));
