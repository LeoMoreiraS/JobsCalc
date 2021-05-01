import  express from "express";
import {routes} from "./routes";
import path from "path";

const server = express();
const port = 5000;
server.set("view engine","ejs")
server.use(express.static(path.join(__dirname,"../public")));
server.set("views",path.join(__dirname, "views"));
server.use(express.urlencoded());
server.use(routes);
server.listen(port, ()=>{console.log("Rodando na porta: ",port)});

