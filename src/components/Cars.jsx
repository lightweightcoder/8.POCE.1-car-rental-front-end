import React, { useState, useContext } from "react";

// import all the appropriate car rental functions
import {
  carRentalContext,
  loadCars,
  selectCarAction
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
    </div>
  );
}