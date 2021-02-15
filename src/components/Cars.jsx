import React, { useState, useContext } from "react";

// import all the appropriate car rental functions
import {
  carRentalContext,
  loadCars,
  selectCarAction,
  loadBookings,
} from "../car-rental";

export default function Cars() {
  console.log('render Cars');
  // initialize the car rental from the context provider to obtain the 
  // car rental state and dispatch function from the value attribute of the provider Higher Order Component in car-rental.js
  const {carRental, dispatch} = useContext(carRentalContext);

  // get the cars and currentCarIndex from the car rental context state data
  const {cars, currentCarId} = carRental;

  // set the local state for the cars filtered
  // cars datatype is an array
  const [filteredCars, setFilteredCars] = useState([...cars]);

  // set local state for filter for filtering cars to display
  const [filter, setFilter] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  // when the user selects a car, dispatch the event and set the
  // data. this will trigger a rerender b/c the data is in Context
  const setCarSelected = (id) => {
    // update the global state in car-rental.js
    dispatch(selectCarAction(id));
  };

  const handleLoadCars = () => {
    loadCars(dispatch).then((carsData) => {
      console.log('going to setFilteredCars');
      console.log('cars is', cars);
      // update the filtered cars state with the cars
      // setFilteredCars([...cars]);
      setFilteredCars([...carsData]);
    });
  }

  const handleFilterClick = () => {
    // get all bookings from database
    loadBookings().then((bookings) => {
      // console.log('bookings are', bookings);

      // filter out the bookings within the filter date range
      const clashingBookings = bookings.filter(booking => {
        const isClash = Date.parse(booking.startDate) >= Date.parse(filter.startDate) && Date.parse(booking.endDate) <= Date.parse(filter.endDate);
        return isClash;
      })
      // console.log('clashing bookings:', clashingBookings);

      // filter out all distinct car ids from the filtered bookings
      const unavailableCarIds = [];
      if (clashingBookings.length > 0) {
        clashingBookings.forEach((booking) => {
          if (!unavailableCarIds.includes(booking.carId)) {
            unavailableCarIds.push(booking.carId);
          }
        });
      }
      // console.log('unavailable car ids is', unavailableCarIds);

      // filter out the available cars using the car ids that are already booked for that date range
      const availableCars = cars.filter((car) => {
        return !(unavailableCarIds.includes(car.id));
      })

      // update the local state of filtered cars
      setFilteredCars([...availableCars]);
    })

  }

  return (
    <div className="col-sm">
      <div className="cars">
        {filteredCars.length === 0 && (
          <button type="button" onClick={handleLoadCars}>
            Get Cars
          </button>
        )}
        {filteredCars.map((car, index) => (
          <button
            key={car.id}
            type="button"
            className={car.id === currentCarId ? "car selected" : "car"}
            onClick={() => setCarSelected(car.id)}
          >
            {`${car.manufacturer} ${car.model}`}
          </button>
        ))}
      </div>
      {filteredCars.length !== 0 && (
        <div className="row">
          <div className="col-12">
            <p>Filter by dates:</p>
          </div>
          <div className="col-6">
            <p>Start date</p>
          </div>
          <div className="col-6">
            <p>End date</p>
          </div>
          <div className="col-6">
            <input type="date" id="start-date" name="start-date" value={filter.startDate} min="2021-01-01" max="2021-12-31" onChange={(e) => setFilter({...filter, startDate: e.target.value})} />
          </div>
          <div className="col-6">
            <input type="date" id="end-date" name="end-date" value={filter.endDate} min="2021-01-01" max="2021-12-31" onChange={(e) => setFilter({...filter, endDate: e.target.value})} />
          </div>
          <div className="col-12">
            <br></br>
            <button type="button" onClick={handleFilterClick}>apply filter</button>
          </div>
        </div>
      )}
    </div>
  );
}