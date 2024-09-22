import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    totalCost: 0,
    restaurantData: []
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const itemInCart = state.cart.find(element => element.name === action.payload.data.name);
            if (itemInCart) {
                itemInCart.quantity += 1;
                state.totalCost += itemInCart.price;
            } else {
                const cartItem = {
                    imageRef: action.payload.data.image,
                    name: action.payload.data.name,
                    quantity: 1,
                    price: action.payload.data.price,
                };
                state.cart.push(cartItem);
                state.totalCost += cartItem.price;
            }
        },
        removeFromCart: (state,action)=>{
            const itemInCart = state.cart.find(element => element.name === action?.payload.data.name);
            if (itemInCart) {
                itemInCart.quantity -= 1;
                state.totalCost -= itemInCart.price;
                if (itemInCart.quantity <= 0) {
                    state.cart = state.cart.filter(element => element.name !== itemInCart.name);
                }
            }
        },
        emptyCart: (state,action)=>{
            state.totalCost = 0;
            state.cart = [];
        },
        addRestaurantData: (state,action)=>{
            state.restaurantData = action.payload;
        }
    }
})

export const {addToCart , removeFromCart , emptyCart , addRestaurantData} = cartSlice.actions;
export default cartSlice.reducer;