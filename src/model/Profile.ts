interface Data {
    nome:string;
    avatar:string;
    "monthly-budget":number;
    "days-per-week":number;
    "hours-per-day":number;
    "vacation-per-year":number;
    "value-hour":number;
    data;
    update;
}

let Profile:Data ={
    nome : "Leonardo",
    avatar: "https://github.com/LeoMoreiraS.png",
    "monthly-budget":3000,
    "days-per-week":6,
    "hours-per-day":8,
    "vacation-per-year":1,
    "value-hour": 20,
    get data(){
        return this;
    },
    update(newProfile:Data){
        this.nome = newProfile.nome;
        this.avatar = newProfile.avatar;
        this["monthly-budget"] = newProfile["monthly-budget"];
        this["days-per-week"] = newProfile["days-per-week"];
        this["hours-per-day"] = newProfile["hours-per-day"];
        this["vacation-per-year"] = newProfile["vacation-per-year"];
        this["value-hour"] = newProfile["value-hour"];
         
    }
};


export {Profile}