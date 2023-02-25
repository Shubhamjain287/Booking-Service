const { BookingService } =require("../services/index");
const { StatusCodes } = require("http-status-codes");
const { createChannel , publushMessage } = require("../utils/messageQueues");
const { REMINDER_BINDING_KEY } = require("../config/serverConfig");

const bookingService = new BookingService();

class BookingController{

    constructor(){
        
    }

    async sendMessageToQueue(req,res){
        const channel = await createChannel();
        const data = { message : "Success"};
        publushMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(data));
        return res.status(200).json({
            message: "Successfully published the event"
        })
    }

    async create (req,res) {
        try {
            const response = await bookingService.createBooking(req.body);
            return res.status(StatusCodes.OK).json({
                data: response,
                success: true,
                message: `Successfully Completed Booking`,
                err: {}
            });
        } catch (error) {
            console.log(error);
            return res.status(error.statusCodes).json({
                data: {},
                success: false,
                message: error.message,
                err: error.explanation
            });
        }
    }
}

module.exports = BookingController;