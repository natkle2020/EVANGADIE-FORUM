// import { useReducer } from 'react';
import { useReducer } from 'react';
import { Type } from './action';


export const InitialState = {
  user:null,
  loading:true
};

export const Reducer = (state, action) => {
  switch (action.type) {
    case Type.SET_USER:
      return {
        ...state,
        user: action.user
      }
    case Type.SET_LOADING:
      return {...state, loading: action.loading}
    default:
      return state;
  }
};


