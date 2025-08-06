import axios from "axios"
import axiosInstance, { apiRequest } from "./api"
const URL = 'http://localhost:8080'

const CategoryService = {
    getAllCategories() {
        return apiRequest(axiosInstance.get(URL + '/api/category'))
    },
    addCategory(data){
         return apiRequest(axiosInstance.post(URL + '/api/category', data))

    }
}

export default CategoryService