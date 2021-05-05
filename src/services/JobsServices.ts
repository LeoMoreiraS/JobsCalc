

class JobsServices{
     remainingDay(job):number {
        const remainingD = (Number(job["total-hours"])/Number(job["daily-hours"])).toFixed();  
        const createdDate = new Date(job["created-at"]);
        const dueDay = createdDate.getDate() + Number(remainingD);
        const dueDate = createdDate.setDate(dueDay);
        const daysToGo = ((dueDate - Date.now())/(1000*60*60*24)).toFixed();
        
        return parseInt(daysToGo);
    }
    calculateBudget(job,valueHour){ return valueHour*job["total-hours"]}
}
export { JobsServices };