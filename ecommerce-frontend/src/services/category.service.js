import axios from "axios"
import axiosInstance, { apiRequest } from "./api"
const URL = 'http://localhost:8080'

const CategoryService = {
    getAllCategories() {
        return apiRequest(axiosInstance.get(URL + '/api/category'))
    },
    addCategory(data){
         return apiRequest(axiosInstance.post(URL + '/api/category', data))
    },
    getCategoryById(id){
        return apiRequest(axiosInstance.get(URL + `/api/category/${id}`))
        
    },
    updateCategory(id, data){
         return apiRequest(axiosInstance.put(URL + `/api/category/${id}`, data))

    }
}

export default CategoryService