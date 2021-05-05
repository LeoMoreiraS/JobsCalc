import {Request,Response} from "express";
import {Profile} from "../model/Profile"


class ProfileController{
   async index(req:Request, res:Response){
        const data = await Profile.data();
        return res.render("pages/profile",{"profile":data});
    }
    async update(req:Request, res:Response){
        let profile = await Profile.data();
        const data = req.body;
        //media semanas mes com ferias
        const weeksPerMonth = (52- data["vacation-per-year"])/12
        //horas trabalhadas na semana
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
        //horas mensais
        const monthlyTotalHours = weekTotalHours * weeksPerMonth;

        data["value-hour"] = data["monthly-budget"] / monthlyTotalHours;
        Profile.update({
            ...profile,
            ...data,
        })
        res.redirect("/profile")
    }
}


export{ ProfileController }