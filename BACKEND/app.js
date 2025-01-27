import express from "express";
import morgan from 'morgan';
import connect from "./db/db.js";
import "dotenv/config.js";
import userroutes from "./routes/user.route.js";
import cookieParser from "cookie-parser";
const app= express();
import cors from "cors";
import projectRoutes from "./routes/project.routes.js";

app.use(cors());    
connect();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/user",userroutes); 
app.use(cookieParser());
app.use("/project",projectRoutes);

app.get("/", (req, res) => {
    res.send("Server is ready");
});



export default app;

