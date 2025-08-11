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
        logout(state){
            state.accessToken = null,
            state.customer = null,
            state.isLoggedIn = false
            localStorage.removeItem('accessToken')
            localStorage.removeItem('customer')
        }
    }
})

export const {loginSuccess, logout} = customerSlice.actions
export default customerSlice.reducer
