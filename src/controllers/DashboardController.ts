import {Profile} from "../model/Profile"
import {Request,Response} from "express";
import {Jobs} from "../model/Job"
import { JobsServices } from "../services/JobsServices"
const jobsService = new JobsServices();
let profile = Profile.data;

class DashboardController {
    index(req:Request,res:Response){
        let jobs = Jobs.getData();
        let statusCount ={
            progress:0,
            total:jobs.length,
            done:0,
        }
        
        let workingHours = 0;
        const updateJobs = jobs.map((job)=>{
            const remaining = jobsService.remainingDay(job);
            const status = (remaining <= 0) ? 'done' : 'progress';
          
            statusCount[status] += 1;//acessa o done e o progress pela string status muita doideira
            status==="progress"?workingHours+=job["daily-hours"]:0;
            return{
                ...job,
                remaining: remaining,
                status: status,
                budget: jobsService.calculateBudget(job,profile["value-hour"])
            }
    
        });
        jobs = updateJobs;
        let freeHours = profile["hours-per-day"] - workingHours;
        res.render("pages/index",{"profile":profile,"jobs":updateJobs,"statusCount":statusCount,"freeHours":freeHours})
    }
}

export {DashboardController};