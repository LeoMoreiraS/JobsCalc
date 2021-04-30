import express from "express";
const routes = express.Router();


const profile ={
    nome : "Leonardo",
    avatar: "https://avatars.githubusercontent.com/u/50107559?s=400&u=46a1fc22da589b574e93c6ab92201ef18afceb36&v=4",
    "monthly-budget":3000,
    "days-per-week":6,
    "hours-per-day":5,
    "vacation-per-year":1

}

routes.get("/",(req,res)=>res.render("pages/index"));
routes.get("/job",(req,res)=>res.render("pages/job"));
routes.get("/job-edit",(req,res)=>res.render("pages/job-edit"));
routes.get("/profile",(req,res)=>res.render("pages/profile",{profile}));




export { routes }