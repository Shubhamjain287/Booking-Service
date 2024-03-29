const { AppError, ValidationError } = require("../utils");
const { Booking } = require("../models/index");
const { StatusCodes } = require("http-status-codes");

class BookingRepository{

    async create(data){
        try {
            const booking = Booking.create(data);
            return booking;
        } catch (error) {
            if(error.name == "SequelizeValidationError"){
                throw new ValidationError(error);
            }

            throw new AppError('RepositoryError',
            'Cannot create Booking',
            'There was Some issue creating the booking, please try again later', 
            StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async update(bookingId,data){
        try {
            // await Booking.update(data,{
            //     where: {
            //         id: bookingId
            //     }
            // });

            const booking = await Booking.findByPk(bookingId);
            if(data.status){
                booking.status = data.status;
            }
            await booking.save();
            return booking;

        } catch (error) {
            throw new AppError('RepositoryError',
            'Cannot create Booking',
            'There was Some issue creating the booking, please try again later', 
            StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

}

module.exports = BookingRepository;