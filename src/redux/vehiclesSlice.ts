import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IVehicle } from "../types/Vehicle";

 

type InitialState = {
  vehicles:IVehicle[],
};

const initialState:InitialState = {
  vehicles:[]
}

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,

  reducers: {
    addVehicle: (state, action:PayloadAction<IVehicle[]>) => {
      state.vehicles.push(...action.payload);
    },
    getVehiclesStore: (state) => {
      return state.vehicles.forEach(car=> [{...car}])
    },
    getVehicleByIdStore: (state, action:PayloadAction<number>) => {
     state.vehicles = state.vehicles.filter(vehicle => vehicle.id === action.payload)
    },
    deleteVehicleById: (state, action:PayloadAction<number>) => {
      state.vehicles = state.vehicles.filter(vehicle => vehicle.id !== action.payload)
    },
    editVehicleById: (state, action:PayloadAction<IVehicle[]|any>) => {
      return state.vehicles.forEach((vehicle) => {
        if (vehicle.id === action.payload.id) {
           return [{...vehicle}, action.payload];
        } else {
          return vehicle;
        }
      }); 
       
    },
  },
});

export const { addVehicle, editVehicleById,deleteVehicleById,getVehicleByIdStore,getVehiclesStore} = vehicleSlice.actions;
export default vehicleSlice.reducer;
