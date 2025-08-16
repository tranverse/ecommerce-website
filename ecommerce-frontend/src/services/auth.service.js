import axiosInstance, { apiRequest } from "./api"
const URL = 'http://localhost:8080'


const AuthService = {
    customerRegister(data){
        return apiRequest(axiosInstance.post(URL + "/auth/customer/register", data))
    },
    customerLogin(data){
        return apiRequest(axiosInstance.post(URL + "/auth/customer/login", data))
    },
    employeeLogin(data){
        return apiRequest(axiosInstance.post(URL + "/auth/employee/login", data))
    },
    updateCustomer(id, data){
        return apiRequest(axiosInstance.put(URL + `/auth/customer/update/${id}`, data))
      
    },
    updateCustomerPassword(data, id){
        return apiRequest(axiosInstance.put(URL + `/auth/customer/change-password/${id}`, data))
    }

}
export default AuthService