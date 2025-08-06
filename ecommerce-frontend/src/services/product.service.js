import axios from "axios"
import axiosInstance, { apiRequest } from "./api"
const URL = 'http://localhost:8080'
const ProductService = {
    getAllProduct  (){
        return apiRequest(axiosInstance.get(URL + '/api/product'))
    },

    getProduct(id) {
        return apiRequest(axiosInstance.get(URL + '/api/product/' + id))
    },

    getAllCategory(){
        return  apiRequest(axiosInstance.get(URL + '/api/category/'))
    },

    getProductStatus(){
        return apiRequest(axiosInstance.get(URL + '/api/product/status'))
    },
    addProduct(data){
        return apiRequest(axiosInstance.post(URL + '/api/product', data))

    }

}

export default ProductService