import React, { useContext } from "react";

// import all the appropriate car rental functions
import {
  carRentalContext,
  loadCars,
  selectCarAction
} from "../car-rental";

export default function Cars() {
  // initialize the car rental from the context provider to obtain the 
  // car rental state and dispatch function from the value attribute of the provider Higher Order Component in car-rental.js
  const {carRental, dispatch} = useContext(carRentalContext);

  // get the cars and currentCarIndex from the car rental context state data
  const {cars, currentCarIndex} = carRental;

  // when the user selects a car, dispatch the event and set the
  // data. this will trigger a rerender b/c the data is in Context
  const setCarSelected = (item, index) => {
    // update the global state in car-rental.js
    dispatch(selectCarAction(index));
  };

  return (
    <div className="col-sm">
      <div className="cars">
        {cars.length === 0 && (
          <button type="button" onClick={() => loadCars(dispatch) }>
            Get Cars
          </button>
        )}
        {cars.map((car, index) => (
          <button
            key={car.id}
            type="button"
            className={index === currentCarIndex ? "car selected" : "car"}
            onClick={() => setCarSelected(car, index)}
          >
            {`${car.manufacturer} ${car.model}`}
          </button>
        ))}
      </div>
    </div>
  );
}