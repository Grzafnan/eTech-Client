import React, { createContext, useContext, useEffect, useReducer, } from 'react';
import { actionTypes } from '../state/ProductState/actionTypes';

import { initialState, productReducer } from '../state/ProductState/productReducer';

const PRODUCT_CONTEXT = createContext();

const ProductProvider = ({ children }) => {
  const [state, disPatch] = useReducer(productReducer, initialState)
  console.log(state);
  useEffect(() => {
    disPatch({ type: actionTypes.FETCHING_START })
    fetch(`${process.env.REACT_APP_API_URL}/products`)
      .then(res => res.json())
      .then(data =>
        disPatch({ type: actionTypes.FETCHING_SUCCESS, payload: data?.data })
      )
      .catch(err => {
        disPatch({ type: actionTypes.FETCHING_ERROR })
      })
  }, []);


  const value = {
    state,
    disPatch
  }

  return (
    <PRODUCT_CONTEXT.Provider value={value}>
      {children}
    </PRODUCT_CONTEXT.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(PRODUCT_CONTEXT);
  return context;
}

export default ProductProvider;