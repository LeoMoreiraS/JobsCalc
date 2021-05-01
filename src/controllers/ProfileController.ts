import {Request,Response} from "express";
let profile ={
    nome : "Leonardo",
    avatar: "https://github.com/LeoMoreiraS.png",
    "monthly-budget":3000,
    "days-per-week":6,
    "hours-per-day":5,
    "vacation-per-year":1,
    "value-hour": 20

}
class ProfileController{
    index(req:Request, res:Response){
        return res.render("pages/profile",{profile});
    }
    update(req:Request, res:Response){
        const data = req.body;
        //media semanas mes com ferias
        const weeksPerMonth = (52- data["vacation-per-year"])/12
        //horas trabalhadas na semana
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
        //horas mensais
        const monthlyTotalHours = weekTotalHours * weeksPerMonth;

        data["value-hour"] = data["monthly-budget"] / monthlyTotalHours;

        profile = {
            ...profile,
            ...data,
        }
        res.redirect("/profile")
    }
}


export{profile , ProfileController }