const TicketService = require('../services/email-service');

const create = async(req, res) =>{
    try {
        const response = await TicketService.createNotification(req.body)
        return res.status(201).json({
            data: response,
            err: {},
            message: "successfully generated an email reminder",
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            err: error,
            message: "somwthing went wrong in controller",
            success: false
        })
    } 
}

module.exports ={
    create
}