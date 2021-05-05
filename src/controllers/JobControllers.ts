import {Request,Response} from "express";
import { JobsServices } from "../services/JobsServices"
import {Profile} from "../model/Profile"
import {Jobs} from "../model/Job"
const jobsService = new JobsServices();



class JobsController{
    

    showJobs(req:Request, res:Response){
       return res.render("pages/job");
    }
    async showJob(req:Request, res:Response){
        let profile = await Profile.data();
        let jobs = await Jobs.getData();
        let job:any = jobs.find(j => j.id==parseInt(req.params.id))
        if(!job){
            return res.redirect("/")
        }

        job.budget = jobsService.calculateBudget(job,profile["value-hour"]);
        console.log(job.budget)
       return res.render("pages/job-edit",{"job":job})

    }
    async addJob(req:Request, res:Response){
        let jobs = await Jobs.getData();
        Jobs.jobPush({
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at : Date.now()
        })
        
       
        res.redirect("/");
    }
    async update(req:Request, res:Response){
        let jobs = await Jobs.getData();
        let job:any = jobs.find(j => j.id==parseInt(req.params.id))
        if(!job){
            return res.redirect("/")
        }
        const data = req.body; 
        const updatedJob = {
            name:data.name,
            "total-hours":data["total-hours"],
            "daily-hours":data["daily-hours"]
        }
        
        
        await Jobs.update(updatedJob,Number(req.params.id));
        res.redirect("/")
    }
    delete(req:Request, res:Response){
        Jobs.delete(req.params.id);
        res.redirect("/")
    }

}

export { JobsController };