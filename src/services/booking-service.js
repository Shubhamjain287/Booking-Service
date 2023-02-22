const { default: axios } = require("axios");
const { response } = require("express");
const { FLIGHT_SERVICE_PATH } = require("../config/serverConfig");
const { BookingRepository } = require("../repository/index");
const { ServiceError } = require("../utils");

class BookingService {
  constructor() {
    this.bookingRepository = new BookingRepository();
  }

  async createBooking(data) {
    try {
      const flightId = data.flightId;
      const getFLightRequestURL = `${FLIGHT_SERVICE_PATH}/flight/${flightId}`;
      const response = await axios.get(getFLightRequestURL);
      const flightData = response.data.data;
      const priceOfThePrice = flightData.price;

      if(data.noOfSeats > flightData.totalSeats){
        throw new ServiceError(`Something went wrong in the booking process`, `Insufficients Seats in the flight`);
      }

      const totalCost = priceOfThePrice * data.noOfSeats;
      const bookingPayload = {...data, totalCost};

      const booking = await this.bookingRepository.create(bookingPayload);

      const updateFLightRequetURL =  `${FLIGHT_SERVICE_PATH}/flight/${booking.flightId}`;

      await axios.patch(updateFLightRequetURL,{totalSeats: flightData.totalSeats - booking.noOfSeats});

      const finalBooking = await this.bookingRepository.update(booking.id, {status: "Booked"});

      return finalBooking;

    } catch (error) {
        console.log(error);
        if(error.name == "RepositoryError" || error.name == "ValidationError"){
            throw error;
        }
        throw new ServiceError();
    }
  }
}

module.exports = BookingService;
