import {Request,Response} from "express";
import { JobsServices } from "../services/JobsServices"
import {Profile} from "../model/Profile"
import {Jobs} from "../model/Job"
const jobsService = new JobsServices();
let profile = Profile.data;


class JobsController{
    

    showJobs(req:Request, res:Response){
       return res.render("pages/job");
    }
    showJob(req:Request, res:Response){
        let jobs = Jobs.getData();
        let job:any = jobs.find(j => j.id==parseInt(req.params.id))
        if(!job){
            return res.redirect("/")
        }

        job.budget = jobsService.calculateBudget(job,profile["value-hour"])
       return res.render("pages/job-edit",{"job":job})

    }
    addJob(req:Request, res:Response){
        let jobs = Jobs.getData();
        const lastId = jobs[jobs.length-1]?.id || 0;
        jobs.push({
            id: lastId+1,
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at : Date.now()
        })
        
       
        res.redirect("/");
    }
    update(req:Request, res:Response){
        let jobs = Jobs.getData();
        let job:any = jobs.find(j => j.id==parseInt(req.params.id))
        if(!job){
            return res.redirect("/")
        }
        const data = req.body; 
        const updatedJob = {
            ...job,
            ...data,
        }
        const newJobs = jobs.map(job =>{
            if(Number(job.id)===Number(req.params.id)){
                job = updatedJob;
            }
            return job;
        })
        
        Jobs.update(newJobs);
        res.redirect("/")
    }
    delete(req:Request, res:Response){
        Jobs.delete(req.params.id);
        res.redirect("/")
    }

}

export { JobsController };