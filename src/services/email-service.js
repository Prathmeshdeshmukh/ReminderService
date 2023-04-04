const sender = require('../config/emailConfig');

const TicketRepository = require('../repository/ticket-repository')
const repo = new TicketRepository();
const sendBasicEmail = async (from , to , mailSubject, mailBody) =>{
     const response = await sender.sendMail({
        from : from,
        to : to,
        subject: mailSubject,
        text : mailBody
     })
     console.log(response)
}

const fetchPendingEmails = async(timeStamp)=>{
    try {
       
       const response = await repo.get({status : 'PENDING'});
       return response;         
    } catch (error) {
        console.log(error);
    }
}

const createNotification = async(data)=>{
    try {
       const response = await repo.create(data);
       return response;

    } catch (error) {
        console.log(error);
        
    }
}

const updateticket = async (ticketId, data)=>{
    try {
        const response = await repo.update(ticketId, data);
        return response;
    } catch (error) {
        throw error;
        
    }
}

module.exports = {
    sendBasicEmail,
    fetchPendingEmails,
    createNotification,
    updateticket
}