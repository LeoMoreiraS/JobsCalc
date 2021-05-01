import {Request,Response} from "express";
import { JobsServices } from "../services/JobsServices"
import {profile} from "./ProfileController"
const jobsService = new JobsServices();


let jobs = [
    {
        id: 1,
        name: "Pizzaria",
        "daily-hours": 2,
        "total-hours": 30,
        created_at : Date.now(),
    },
    {
        id: 2,
        name: "to-do-list",
        "daily-hours": 4,
        "total-hours": 40,
        created_at : Date.now(),
    },
]


class JobsController{
    index(req:Request,res:Response){
        const updateJobs = jobs.map((job)=>{
            const remaining = jobsService.remainingDay(job);
            const status = (remaining <= 0) ? 'done' : 'progress';
          
            return{
                ...job,
                remaining: remaining,
                status: status,
                budget: jobsService.calculateBudget(job,profile["value-hour"])
            }
    
        });
        jobs = updateJobs;
        res.render("pages/index",{"profile":profile,"jobs":updateJobs})
    }

    showJobs(req:Request, res:Response){
       return res.render("pages/job");
    }
    showJob(req:Request, res:Response){
        let job:any = jobs.find(j => j.id==parseInt(req.params.id))
        if(!job){
            return res.redirect("/")
        }

        job.budget = jobsService.calculateBudget(job,profile["value-hour"])
       return res.render("pages/job-edit",{"job":job})

    }
    addJob(req:Request, res:Response){

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
        let job:any = jobs.find(j => j.id==parseInt(req.params.id))
        if(!job){
            return res.redirect("/")
        }
        const data = req.body;
        console.log(data)

        const updatedJob = {
            ...job,
            ...data,
        }
        console.log(updatedJob)
        jobs.map(job =>{
            job.id == parseInt(req.params.id)?jobs[job.id]=updatedJob:0;
        })
        res.redirect("/")
    }
    delete(req:Request, res:Response){
        jobs = jobs.filter(job => job.id !== Number(req.params.id))

        res.redirect("/")
    }

}

export { JobsController };