const bodyParser = require('body-parser');
const express = require('express');
const {PORT} = require('./config/serverConfig')
const cron =require('cron')
const { sendBasicEmail } = require('./services/email-service')
const setupAndStartServer =() =>{
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}))
    app.listen(PORT , ()=>{
        console.log('server started on PORT', PORT);
        
        var CronJob = require('cron').CronJob;
        var job = new CronJob(
            '* * * * * *',
            function() {
                // sendBasicEmail(
                //     "support@admin.com",
                //     "prathmeshd60@gmail.com",
                //     "TestingMail",
                //     "Hey hope you like our service"
                //     )
            },
            null,
            true,
            'America/Los_Angeles'
        );
    })
}

setupAndStartServer()