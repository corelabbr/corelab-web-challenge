import { Dispatch, useReducer } from 'react';

type State = {
  id?: number;
  image?: File | null;
  model?: string;
  brand?: string;
  color?: string;
  price?: number;
  year?: number;
  rating?: number | null;
  category?: string;
};

type Action =
  | {
      type: 'setVehicleProps';
      payload: {
        id?: number;
        image?: File;
        model?: string;
        brand?: string;
        color?: string;
        price?: number;
        year?: number;
        rating?: number;
        category?: string;
      };
    }
  | {
      type: 'setModel';
      model: string;
    }
  | {
      type: 'clearVehicleProps';
    };

const initialState = {
  id: 0,
  image: null,
  model: '',
  brand: '',
  color: 'red',
  price: 0,
  year: 0,
  rating: null,
  category: 'car',
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'setVehicleProps':
      return {
        ...state,
        id: action.payload.id,
        image: action.payload.image,
        model: action.payload.model,
        brand: action.payload.brand,
        color: action.payload.color,
        price: action.payload.price,
        year: action.payload.year,
        rating: action.payload.rating,
        category: action.payload.category,
      };
    case 'setModel':
      return {
        ...state,
        model: action.model,
      };

    case 'clearVehicleProps':
      return initialState;
    default:
      return state;
  }
};

const useVehicleReducer = (value = initialState): [State, Dispatch<Action>] => {
  const [state, dispatch] = useReducer(reducer, value);

  return [state, dispatch];
};

export { useVehicleReducer };
