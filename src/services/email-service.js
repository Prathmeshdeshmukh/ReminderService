const sender = require('../config/emailConfig');

const sendBasicEmail = async (from , to , mailSubject, mailBody) =>{
     const response = await sender.sendMail({
        from : from,
        to : to,
        subject: mailSubject,
        text : mailBody
     })
     console.log(response)
}

module.exports = {
    sendBasicEmail
}