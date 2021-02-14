import { useState, useContext } from 'react';

// import all the appropriate car rental functions
import {
  carRentalContext,
} from "../car-rental";

export default function CreateBooking() {
  // initialize the car rental from the context provider to obtain the 
  // car rental state and dispatch function from the value attribute of the provider Higher Order Component in car-rental.js
  const {carRental, dispatch} = useContext(carRentalContext);

  // get the selected car from the car rental context state data
  const {currentCarIndex, cars} = carRental;
  const currentCar = cars[currentCarIndex];

  // initialise local states
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div className="container">
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
          <input type="date" id="start-date" name="start-date" value={startDate} min="2021-01-01" max="2021-12-31" onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="col-6">
          <input type="date" id="end-date" name="end-date" value={endDate} min="2021-01-01" max="2021-12-31" onChange={(e) => setEndDate(e.target.value)} />
        </div>
      </div>
    </div>
  );
}