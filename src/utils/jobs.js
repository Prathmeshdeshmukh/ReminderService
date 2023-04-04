const cron = require('node-cron');
const emailService = require('../services/email-service')
const sender = require('../config/emailConfig');



const setupJobs = () =>{
    cron.schedule('*/2 * * * *', async() =>{
        const response = await emailService.fetchPendingEmails();
        response.forEach((email) => {
            sender.sendMail({
                to: email.recepientEmail,
                subject: email.subject,
                content: email.content
            },async (err, data) => {
                if(err){
                    console.log(err);
                }else{
                    //updating status
                    await emailService.updateticket(email.id , {status:"SUCCESS"});
                }
            })
        })
        console.log(response);
        
    })


}

module.exports= setupJobs;
