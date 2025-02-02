import mongoose from "mongoose";
import "dotenv/config.js";

function connect() {
    mongoose.connect(process.env.MONGODB).then (()=>{
        console.log("Connected to MongoDB");
    }).catch((error)=>{
        console.log("Error connecting to MongoDB", error.message);
    });
}

export default connect;
