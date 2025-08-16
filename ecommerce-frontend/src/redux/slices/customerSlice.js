import { createSlice } from "@reduxjs/toolkit";

const accessTokenFromLocalStorage = localStorage.getItem('accessToken')
const customerFromLocalStorage = JSON.parse(localStorage.getItem('customer') || 'null');


const initialState = {
    accessToken: accessTokenFromLocalStorage ? accessTokenFromLocalStorage: null,
    customer: customerFromLocalStorage ? customerFromLocalStorage: null,
    isLoggedIn: accessTokenFromLocalStorage ? accessTokenFromLocalStorage: false
}

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        loginSuccess(state, action){
            state.accessToken = action.payload.accessToken
            state.customer = action.payload.customer
            state.isLoggedIn = true
            localStorage.setItem('accessToken', state.accessToken)
            localStorage.setItem('customer', JSON.stringify(state.customer))
        },
        logoutCustomer(state){
            state.accessToken = null,
            state.customer = null,
            state.isLoggedIn = false
            localStorage.removeItem('accessToken')
            localStorage.removeItem('customer')
        },
        updateCustomer(state, action){
            state.customer = action.payload
            localStorage.removeItem('customer')
            localStorage.setItem('customer', JSON.stringify(state.customer))
        },
    }
})

export const {loginSuccess, logoutCustomer, updateCustomer} = customerSlice.actions
export default customerSlice.reducer
