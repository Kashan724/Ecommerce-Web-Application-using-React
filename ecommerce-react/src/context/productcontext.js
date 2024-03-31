// create a context
// provider
// consumer =>  useContext Hook

import axios from "axios";
import { useReducer } from "react";
import  { createContext,useContext, useEffect } from "react";
import reducer from "../reducer/productReducer";


const AppContext = createContext();
const API = "https://api.pujakaitem.com/api/products";

const initialState = {
    isLoading:false,
    isError:false,
    products:[],
    featuredProducts:[],
    isSingleLoading:false,
    singleProduct:{} // in object form
};
    
// creating global store
const AppProvider = ({children}) => {
    const[state,dispatch]=useReducer(reducer,initialState);

    const getProducts = async (url) => {
          dispatch({type:"SET_LOADING"});
          try{const res = await axios.get(url);
          const products = await res.data;
          dispatch({type:"SET_API_DATA",payload:products})}
          catch(error){
            dispatch({type:"API_ERROR"});
          }

          // payload is requirement that which data is required
          // console.log("~file:productcontext.js~line 16~getProducts~products",products)

    }
    // 2nd api call for single product

    const getSingleProduct = async (url) => {
        dispatch({type:"SET_SINGLE_LOADING"});
        try{
            const res = await axios.get(url);
            const singleProduct = await res.data;
            dispatch({type:"SET_SINGAL_PRODUCT",payload:singleProduct})
        }catch(error){
            dispatch({type:"SET_SINGLE_ERROR"});
        }

    }


    useEffect(() =>{
        getProducts(API);
   },[]);// passing array dependency for running only first time after each reload
  // state is for data that is defined in initialState
     return <AppContext.Provider value={{...state,getSingleProduct}}>          
        {children}
     </AppContext.Provider>
}
// custom context 
const useProductContext =() =>{
    return useContext(AppContext)
}


export {AppProvider,AppContext,useProductContext,}