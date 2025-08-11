import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './slices/cartSlice.js'
import customerReducer from './slices/customerSlice.js'
import employeeReducer from './slices/userSlice.js'
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        customer: customerReducer,
        employee: employeeReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})