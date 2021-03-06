import React, { useReducer } from "react";
import axios from 'axios';

// variables that represent which view (page) to load
const HOME = 'HOME';
const CREATE = 'CREATE';

// create an object that represents all the data contained in app.js
export const initialState = {
  cars: [],
  currentCarId: null,
  view: HOME
}

/* ********************************
 * ********************************
 * ********************************
 * ********************************
 *          Actions
 * ********************************
 * ********************************
 * ********************************
 * ********************************
 */

// define the action types of the reducer function
const LOAD_CARS = "LOAD_CARS";
const SELECT_CAR = 'SELECT_CAR';
const REMOVE_CAR = 'REMOVE_CAR';

// define the action creators for the reducer function
export function loadCarsAction(cars) {
  return {
    type: LOAD_CARS,
    payload: {
      cars
    }
  };
}

export function selectCarAction(carId) {
  return {
    type: SELECT_CAR,
    payload: {
      carId
    }
  };
}

export function removeCarAction() {
  return {
    type: REMOVE_CAR,
  };
}

// define the reducer functions coressponding to the action type
export function carRentalReducer(state, action) {
  switch (action.type) {
    case LOAD_CARS:
      return {...state, cars: action.payload.cars}
    case SELECT_CAR:
      const currentCarId = action.payload.carId;
      return {...state, currentCarId, view: CREATE }
    case REMOVE_CAR:
      return {...state, currentCarId: null, view: HOME }
    default:
      return state;
  }
}

/* ********************************
 * ********************************
 * ********************************
 * ********************************
 *        Provider Code
 * ********************************
 * ********************************
 * ********************************
 * ********************************
 */

// create a react context and get the provider component of the context
export const carRentalContext = React.createContext(null);
const {Provider} = carRentalContext;

// export a provider HOC that contains the initalized reducer
// pass the reducer as context to the children
// any child component will be able to alter the state of the app
export function CarRentalProvider({children}) {
  const [carRental, dispatch] = useReducer(carRentalReducer, initialState);
  return (<Provider value={{carRental, dispatch}}>
      {children}
    </Provider>)
}

/* ********************************
 * ********************************
 * ********************************
 * ********************************
 *     Requests to back-end
 * ********************************
 * ********************************
 * ********************************
 * ********************************
 */
const BACKEND_URL = 'http://localhost:3004';

export function loadCars(dispatch){
  return axios.get(BACKEND_URL+'/cars').then((result) => {
    console.log('going to do dispatch');
    dispatch(loadCarsAction(result.data.cars));
    console.log('after calling dispatch in loadCars');
    return result.data.cars;
  });
}

export function createBooking(dispatch, booking){
  return axios.post(BACKEND_URL+'/bookings', booking).then((result) => {
    // return the new booking object
    return result.data.booking.id;
  });
}

export function loadBookings(){
  return axios.get(BACKEND_URL+'/bookings').then((result) => {
    return result.data.bookings;
  });
}