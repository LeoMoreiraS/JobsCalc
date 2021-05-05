const Database =require("../db/config");

interface Ijobs {
    data;
    update;
    getData;
    delete;
    jobPush;
}
let Jobs={
        async getData(){
            const db = await Database();
            const jobs = await db.all(`SELECT * FROM jobs`);
            const newJobs = jobs.map(job=>({ 
                    id: job.id,
                    name: job.name,
                    "daily-hours": Number(job.daily_hours),
                    "total-hours": Number(job.total_hours),
                    "created-at" : Number(job.created_at)
                })
            )
            return newJobs;
        },
        async update(newData,jobId){
            const db = await Database();
            console.log(newData)
            console.log(jobId);
            db.run(`UPDATE jobs SET
                name= '${newData.name}',
                daily_hours = ${newData["daily-hours"]},
                total_hours = ${newData["total-hours"]}
                WHERE id=${jobId}
            `);

            db.close();
        },
       async delete(id){
            const db = await Database();
            db.run(`DELETE FROM jobs WHERE id=${id}`);
            db.close();

        },
        async jobPush(job){
            const db = await Database();
            db.run(`
            INSERT INTO jobs 
            (
                name,
                daily_hours,
                total_hours,
                created_at
            )
            VALUES 
            (
                "${job.name}",
                ${job["daily-hours"]},
                ${job["total-hours"]},
                ${Date.now()}
            );`
            )
            db.close();
        }


};
export { Jobs };
