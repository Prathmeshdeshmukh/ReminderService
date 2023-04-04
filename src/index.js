const bodyParser = require('body-parser');
const express = require('express');
const {PORT} = require('./config/serverConfig')
const cron =require('cron')
const { sendBasicEmail } = require('./services/email-service')
const jobs = require('./utils/jobs');
const TicketController = require('./controllers/ticket-controller');

const setupAndStartServer =() =>{
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}))

    app.post('/api/v1/tickets', TicketController.create)
    app.listen(PORT , ()=>{
        console.log('server started on PORT', PORT);
       
        jobs();
    })
}

setupAndStartServer()