import { useState, useContext } from 'react';

// import all the appropriate car rental functions
import {
  carRentalContext,
  removeCarAction
} from "../car-rental";

// import the child components for the modal
import CreateBooking from "./CreateBooking";

export default function Modal(ChildComponent) {
  // initialize the car rental from the context provider to obtain the 
  // car rental state and dispatch function from the value attribute of the provider Higher Order Component in car-rental.js
  const {carRental, dispatch} = useContext(carRentalContext);

  // get the selected car from the car rental context state data
  const {currentCarIndex, cars} = carRental;
  const currentCar = cars[currentCarIndex];

  // handle to remove car and close the modal
  const handleRemoveCar = () => {
    dispatch(removeCarAction());
  }

  // return nothing if no car is selected
  if (!currentCar) {
    return <div />;
  }

  return (
    <div className="modal-container">
      <div className="modal-content">
        <button className="modal-close" onClick={ handleRemoveCar }>
          x
        </button>
        {carRental.view === 'CREATE' ? <CreateBooking /> : ''}
      </div>
    </div>
  );
}