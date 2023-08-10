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

const subscribeEvents = async(payload) =>{
    let service = payload.service;
    let data = payload.data;
    switch(service){
        case 'SEND_BASIC_MAIL':
            await sendBasicEmail(data);
            break;
        case 'CREATE_TICKET':
            await createNotification(data);
            break;
        default : 
            console.log('invalid service');
            break;
    }
}

module.exports = {
    sendBasicEmail,
    fetchPendingEmails,
    createNotification,
    updateticket,
    subscribeEvents
}