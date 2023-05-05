import { createSlice } from "@reduxjs/toolkit";

export const EmptyCartState = []

export const persistLocalStorageCart = (cartInfo) => {
    localStorage.setItem('cart', JSON.stringify([cartInfo]));
}

export const persistLocalStorageCartRemove = (cartInfo) => {
    localStorage.setItem('cart', JSON.stringify(cartInfo));
}

export const clearLocalStorageCart = () => {
    localStorage.removeItem('cart');
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : EmptyCartState,
    reducers: {
        firstCartItem: (state, action) => {
            persistLocalStorageCart(action.payload)
            return [action.payload]
        },

        addCartItem: (state, action) => {
            persistLocalStorageCart([...state, action.payload])
            return [...state, action.payload]
        },

        clearCart: () => {
            clearLocalStorageCart()
            return EmptyCartState
        },

        removeCartItem: (state, action) => {
            persistLocalStorageCartRemove(action.payload)
            return action.payload
        },

        updateCartItem: (state, action) => {
            persistLocalStorageCartRemove(action.payload)
            return action.payload
        }
    }
})

export const { firstCartItem, addCartItem, clearCart, removeCartItem, updateCartItem } = cartSlice.actions;

export default cartSlice.reducer;