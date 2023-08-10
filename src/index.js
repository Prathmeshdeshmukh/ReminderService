const bodyParser = require('body-parser');
const express = require('express');
const {PORT, REMINDER_BINDING_KEY} = require('./config/serverConfig')
const cron = require('cron')
// const { sendBasicEmail } = require('./services/email-service')
const jobs = require('./utils/jobs');
const TicketController = require('./controllers/ticket-controller');
const { subscribeMessage, createChannel } = require('./utils/messageQueues');
const EmailService = require('./services/email-service');


const setupAndStartServer = async() =>{
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}))

    app.post('/api/v1/tickets', TicketController.create)

    const channel = await createChannel();
    subscribeMessage(channel, EmailService.subscribeEvents, REMINDER_BINDING_KEY);  

    app.listen(PORT , ()=>{
        console.log('server started on PORT', PORT);
        jobs();
    })
}

setupAndStartServer()