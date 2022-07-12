import Axios from 'axios';
import { useEffect, useReducer } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getError } from '../../auxFunctions/getError';

type Vehicle = {
  model: string;
  brand: string;
  color: string;
  year: number;
};

type State = {
  products: Vehicle[];
  page: number;
  pages: number;
  countProducts: number;
  loading: boolean;
  error: string;
};

type Action =
  | {
      type: 'FETCH_REQUEST';
    }
  | {
      type: 'FETCH_SUCCESS';
      products: [];
      page: number;
      pages: number;
      countProducts: number;
    }
  | {
      type: 'FETCH_FAIL';
      error: string;
    };

const initialState = {
  products: [],
  page: 1,
  pages: 10,
  countProducts: 10,
  loading: true,
  error: '',
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.products,
        page: action.page,
        pages: action.pages,
        countProducts: action.countProducts,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export const Search = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchVehicle = new URLSearchParams(search);
  const category = searchVehicle.get('category' || 'all');
  const query = searchVehicle.get('query' || 'all');
  const price = searchVehicle.get('price' || 'all');
  const rating = searchVehicle.get('rating' || 'all');
  const year = searchVehicle.get('rating' || 'all');

  const [searchState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await Axios.get(`/api/products/search?page`);
      } catch (error: any) {
        dispatch({ type: 'FETCH_FAIL', error: getError(error) });
      }
    };
  }, []);
};
