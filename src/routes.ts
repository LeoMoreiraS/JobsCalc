import express from "express";
import {JobsController} from "./controllers/JobControllers"
const jobsController = new JobsController();
import {ProfileController} from "./controllers/ProfileController"
const profileController = new ProfileController();
const routes = express.Router();






routes.get("/",jobsController.index);
routes.get("/job",jobsController.showJobs);
routes.post("/job",jobsController.addJob)
routes.get("/job-edit/:id",jobsController.showJob);
routes.post("/job-edit/:id",jobsController.update);
routes.post("/job/delete/:id",jobsController.delete);
routes.get("/profile",profileController.index);
routes.post("/profile",profileController.update);




export { routes }