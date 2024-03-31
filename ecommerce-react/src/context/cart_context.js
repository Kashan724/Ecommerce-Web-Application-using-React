import { useEffect } from "react";
import { createContext, useContext, useReducer } from "react";
import reducer from "../reducer/cartReducer";

const CartContext=createContext();
const getLocalCartData = ()=>{
    let localCartData = localStorage.getItem("kashancart");
    if(localCartData===[]){
        return []
    }else{
        return JSON.parse(localCartData);
    }
}

const initialState ={
    // cart:[],
    cart:getLocalCartData(),
    total_item:"",
    total_amount:"",
    shipping_fee:50000,

};

// provider function
const CartProvider=({children})=>{
    const [state,dispatch]=useReducer(reducer,initialState);
    const addtoCart=(id,color,amount,product)=>{
            dispatch({type:"ADD_TO_CART",payload:{id,color,amount,product}})
    }
    // increment and decrement
    const setDecrease = (id)=>{
        dispatch({type:"SET_DECREMENT",payload:id});
    }
    const setIncrease = (id)=>{
        dispatch({type:"SET_INCREMENT",payload:id});
    }




    const removeItem=(id)=>{
        dispatch({type:"REMOVE_ITEM",payload:id})
    }
    // to clear the cart
   const clearCart = ()=>{
    dispatch({type:"CLEAR_CART"})
   }



    // adding the data in local storage
    // get vs set
    useEffect(()=>{
        
        // dispatch({type:"CART_TOTAL_ITEM"});
        // dispatch({type:"CART_TOTAL_PRICE"});
        dispatch({type:"CART_ITEM_PRICE_TOTAL"});

        localStorage.setItem("kashancart",JSON.stringify(state.cart));
    },[state.cart])

    return <CartContext.Provider value={{...state,addtoCart,removeItem,clearCart,setDecrease,setIncrease}}>
        {children}
    </CartContext.Provider>
};
// creating global hook
const useCartContext=()=>{
    return useContext(CartContext);
}

export {CartProvider,useCartContext}