import { useContext, useEffect } from "react";
import { createContext,useReducer } from "react";
import { useProductContext } from "./productcontext";
import reducer from "../reducer/filterReducer";

const FilterContext = createContext();

const initialState = {
    filter_products:[],
    all_products:[],
    grid_view:true,
    sorting_value:"lowest",
    filters:{
        text:"",
        category: "all",
        company:"all",
        color:"all",
        maxPrice:0,
        price:0,
        minPrice:0
    },
};

// PROVIDER FUNCTION
export const FilterContextProvider = ({children}) => {
    const{products} =  useProductContext();
    // console.log("products_filter",products)

    const[state,dispatch]=useReducer(reducer,initialState);

    // setting grid_view
    const setGridView = () =>{
        return dispatch({type:"SET_GRIDVIEW"})
    }
    const setListView = () =>{
        return dispatch({type:"SET_LISTVIEW"})
    }
    const sorting = (event) => {
        let userValue = event.target.value;
        dispatch({type:"GET_SORT_VALUE",payload:userValue});
    }

    const updateFilterValue = (event) => {
          let name= event.target.name;
          let value = event.target.value;

          return dispatch({type:"UPDATE_FILTERS_VALUE",payload:{name,value}})
    }

const clearfilters= ()=>{
    dispatch({type:"CLEAR_FILTERS"})
}


    // for sorting the  product
    useEffect(() => {
        dispatch({type:"FILTER_PRODUCTS"})
        dispatch({type:"SORTING_PRODUCTS"})
    },[products,state.sorting_value,state.filters])

    useEffect(() => {
        dispatch({type:"LOAD_FILTER_PRODUCTS",payload:products})
    },[products])

    return( <FilterContext.Provider value={{...state,setGridView,setListView,sorting,updateFilterValue,clearfilters}}>
       {children}
    </FilterContext.Provider>
    );
}

// creating custom hook

export const useFilterContext = () => {
    return useContext(FilterContext);

}