const bodyParser = require('body-parser');
const express = require('express');
const {PORT} = require('./config/serverConfig')


const setupAndStartServer =() =>{
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}))
    app.listen(PORT , ()=>{
        console.log('server started on PORT', PORT)
    })
}

setupAndStartServer()