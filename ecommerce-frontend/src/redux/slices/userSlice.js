import { createSlice } from "@reduxjs/toolkit";
const employeeAccessToken = localStorage.getItem('employeeAccessToken')
const employee =  JSON.parse(localStorage.getItem('employee'))
const initialState = {
    employeeAccessToken: employeeAccessToken ? employeeAccessToken : null,
    employee: employee ? employee : null,
    isLoggedIn: employeeAccessToken ? true : false
}

const employeeSlice = createSlice({
    name: 'emplyee',
    initialState,
    reducers: {
        employeeLogin(state, action){
            state.employeeAccessToken = action.payload.accessToken,
            state.employee = action.payload.employee,
            state.isLoggedIn = true
            localStorage.setItem('employeeAccessToken', action.payload.accessToken)
            localStorage.setItem('employee', JSON.stringify(action.payload.employee))
        },
        logoutEmployee(state){
            state.employeeAccessToken = null
            state.employee = null
            state.isLoggedIn = false
            localStorage.removeItem('employeeAccessToken')
            localStorage.removeItem('employee')
        }
    }
    
})

export const {employeeLogin, logoutEmployee} = employeeSlice.actions
export default employeeSlice.reducer