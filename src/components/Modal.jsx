import { useState, useContext } from 'react';

// import all the appropriate car rental functions
import {
  carRentalContext,
  removeCarAction
} from "../car-rental";

export default function Modal({children}) {
  // initialize the car rental from the context provider to obtain the 
  // car rental state and dispatch function from the value attribute of the provider Higher Order Component in car-rental.js
  const {dispatch} = useContext(carRentalContext);

  // set state for modal visibility
  const [isVisible, setIsVisible] = useState(true);

  // handle to remove selected car and close the modal
  const handleCloseModal = () => {
    dispatch(removeCarAction());
    setIsVisible(false);
  }

  if (isVisible) {
    return (
      <div className="modal-container">
        <div className="modal-content">
          <button className="modal-close" onClick={ handleCloseModal }>
            x
          </button>
          {/* <ChildComponent /> */}
          {children}
        </div>
      </div>
    );
  }
}