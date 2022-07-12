import { configureStore } from "@reduxjs/toolkit";
import vehicleReducer from './vehiclesSlice'
import modalReducer from './modalSlice'

export const store = configureStore({
  reducer: {
    vehicle:vehicleReducer,
    modal:modalReducer
  },
});

type RootState = ReturnType<typeof store.getState>

 
export const selectVehicle = (state:RootState)=>state.vehicle
export const selectModal = (state:RootState)=>state.modal