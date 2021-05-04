interface Ijobs {
    data;
    update;
    getData;
    delete;
}
let Jobs:Ijobs={
     data : [
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
       ],
        getData(){
            return this.data;
        },
         update(newData){
            
            this.data = newData;
            console.log(this.data)
        },
        delete(id){
            this.data = this.data.filter(job => Number(job.id) !== Number(id))
        }

};
export { Jobs };
