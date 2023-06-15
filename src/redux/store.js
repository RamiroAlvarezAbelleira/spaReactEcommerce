import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./states/user";
import { cartSlice } from "./states/cart";

export default configureStore({
    reducer: {
        user: userSlice.reducer,
        cart: cartSlice.reducer
    }
})