import './App.css';
import React from 'react';

// import the contexts providers
import {
  CarRentalProvider
} from "./car-rental";

// import the components
import Cars from "./components/Cars";
import Modal from "./components/Modal";

function App() {
  return (
    <CarRentalProvider>
      <div className="App">
        <div className="container">
          <div className="row">
            <h1 className="page-title">Car Rental</h1>
          </div>
          <div className="row">
            <Cars />
          </div>
        </div>
        <Modal />
      </div>
    </CarRentalProvider>
  );
}

export default App;
