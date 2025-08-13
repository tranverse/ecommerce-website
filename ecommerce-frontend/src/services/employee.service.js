import axios from "axios";
import axiosInstance, { apiRequest } from "./api";
const URL = 'http://localhost:8080'

const EmployeeService = {
     getEmployeeRole(){
          return apiRequest(axiosInstance.get(URL + "/api/employee/get-roles"))
     },
     getEmployeeById(id){
          return apiRequest(axiosInstance.get(URL + `/api/employee/${id}`))
     },
     getAllEmployee(){
          return apiRequest(axiosInstance.get(URL + `/api/employee/get-all`))
     },
     addEmployee(data){
          return apiRequest(axiosInstance.post(URL + "/api/employee/add-employee", data))
     },
     updateEmployee(employeeId, data){
          return apiRequest(axiosInstance.put(URL + `/api/employee/update-employee/${employeeId}`, data))
     }
    
}

export default EmployeeService