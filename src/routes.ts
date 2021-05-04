import express from "express";
import {JobsController} from "./controllers/JobControllers"
import {ProfileController} from "./controllers/ProfileController"
import {DashboardController} from "./controllers/DashboardController"

const jobsController = new JobsController();
const profileController = new ProfileController();
const dashboardController = new DashboardController();
const routes = express.Router();

routes.get("/",dashboardController.index);
routes.get("/job",jobsController.showJobs);
routes.post("/job",jobsController.addJob)
routes.get("/job-edit/:id",jobsController.showJob);
routes.post("/job-edit/:id",jobsController.update);
routes.post("/job/delete/:id",jobsController.delete);
routes.get("/profile",profileController.index);
routes.post("/profile",profileController.update);

export { routes }