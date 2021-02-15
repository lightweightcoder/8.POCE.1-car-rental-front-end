import { useState, useContext } from 'react';
import moment from "moment";

// import all the appropriate car rental functions
import {
  carRentalContext,
  createBooking,
  removeCarAction,
} from "../car-rental";

export default function CreateBooking() {
  // initialize the car rental from the context provider to obtain the 
  // car rental state and dispatch function from the value attribute of the provider Higher Order Component in car-rental.js
  const {carRental, dispatch} = useContext(carRentalContext);

  // get the selected car from the car rental context state data
  const {currentCarIndex, cars} = carRental;
  const currentCar = cars[currentCarIndex];

  // initialise local states
  const [booking, setBooking] = useState({
    userEmail: '',
    carId: currentCar.id,
    startDate: new Date(),
    endDate: new Date(),
    bookingId: null,
  });

  // hendle when create booking button is clicked
  const handleCreateBookingClick = () => {
    createBooking(dispatch, booking).then((id) => {
      // return the new booking object
      setBooking({...booking, bookingId: id})
    });
  }

  // hendle when the return to home button is clicked
  const handleBackToHomeClick = () => {
    // remove the selected car from the global state and set the view to homepage
    dispatch(removeCarAction());
  }

  // if there is a booking id, it means that a booking has just been created
  // show the booking details
  if (booking.bookingId) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h4>Booking Complete!</h4>
            <p>{`Booking Id: ${booking.bookingId}`}</p>
            <p>Car: {`${currentCar.manufacturer} ${currentCar.model}`}</p>
            <p>{`Email: ${booking.userEmail}`}</p>
            <p>{`Start date ${moment(booking.startDate).format("YYYY-MM-DD")}`}</p>
            <p>{`End date ${moment(booking.endDate).format("YYYY-MM-DD")}`}</p>
            <br></br>
            <button type="button" onClick={handleBackToHomeClick}>back to home</button>
          </div>
        </div>
      </div>
    );
  }

  // since there is no booking id, show the form to create a booking
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h4>Create Booking</h4>
          <p>Car: {`${currentCar.manufacturer} ${currentCar.model}`}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <label htmlFor="user-email">Email: </label>
          <input id="user-email" type="email" value={booking.userEmail} onChange={(e) => setBooking({...booking, userEmail: e.target.value})} />
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <p>Start date</p>
        </div>
        <div className="col-6">
          <p>End date</p>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <input type="date" id="start-date" name="start-date" value={booking.startDate} min="2021-01-01" max="2021-12-31" onChange={(e) => setBooking({...booking, startDate: e.target.value})} />
        </div>
        <div className="col-6">
          <input type="date" id="end-date" name="end-date" value={booking.endDate} min="2021-01-01" max="2021-12-31" onChange={(e) => setBooking({...booking, endDate: e.target.value})} />
        </div>
        <div className="col-12">
          <br></br>
          <button type="button" onClick={handleCreateBookingClick}>create booking</button>
        </div>
      </div>
    </div>
  );
}