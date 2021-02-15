import React, { useContext } from "react";

// import all the appropriate car rental functions
import {
  carRentalContext,
} from "../car-rental";

import Modal from "./Modal";

// import the child components for the modal we are rendering
import CreateBooking from "./CreateBooking";

export default function CurrentView() {
  // initialize the car rental from the context provider to obtain the 
  // car rental state and dispatch function from the value attribute of the provider Higher Order Component in car-rental.js
  const {carRental} = useContext(carRentalContext);

  // get the current view to show
  const {view} = carRental;

  // return the respective components of the current view
  switch (view) {
    case 'HOME':
      return (
        <div></div>
      )
    case 'CREATE':
      return (
        <Modal>
          <CreateBooking />
        </Modal>
      )
    default:
      return <div></div>;
  } 
}
