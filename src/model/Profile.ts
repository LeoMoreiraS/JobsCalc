const Database =require("../db/config");
interface Data {
    nome:string;
    avatar:string;
    "monthly-budget":number;
    "days-per-week":number;
    "hours-per-day":number;
    "vacation-per-year":number;
    "value-hour":number;

}

let Profile ={
    async data(){
        const db = await Database();

        const dt = await db.get("SELECT * FROM profile");


        let data:Data ={
        nome : dt.name,
        avatar : dt.avatar,
        "monthly-budget":dt.monthly_budget,
        "days-per-week":dt.days_per_week,
        "hours-per-day":dt.hours_per_day,
        "vacation-per-year":dt.vacation_per_week,
        "value-hour":dt.value_hour
        }
        db.close();
        return data;
    },
    async update(newProfile:Data){
        const db = await Database();
        db.run(`
            UPDATE profile SET
            name = '${newProfile.nome}',
            avatar = '${newProfile.avatar}',
            monthly_budget = ${newProfile["monthly-budget"]},
            days_per_week = ${newProfile["days-per-week"]},
            hours_per_day = ${newProfile["hours-per-day"]},
            vacation_per_week = ${newProfile["vacation-per-year"]},
            value_hour = ${newProfile["value-hour"]}
        `)
         db.close();
    }
};


export {Profile}