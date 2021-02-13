import React, { useReducer } from "react";
import axios from 'axios';

// create an object that represents all the data contained in app.js
export const initialState = {
  cart : [],
  cars : [],
  currentCarIndex : null
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

// define the action creators for the reducer function
export function loadCarsAction(cars) {
  return {
    type: LOAD_CARS,
    payload: {
      cars
    }
  };
}

// define the reducer functions coressponding to the action type
export function carRentalReducer(state, action) {
  switch (action.type) {
    case LOAD_CARS:
      return {...state, cars: action.payload.cars}
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
  axios.get(BACKEND_URL+'/cars').then((result) => {
    dispatch(loadCarsAction(result.data.cars));
  });
}