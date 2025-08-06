import axios from "axios";
import axiosInstance, { apiRequest } from "./api";
const URL = 'http://localhost:8080'

const CartService = {
    addProductToCart (cartRequest){
        return apiRequest(axiosInstance.post(URL + "/api/cart", cartRequest))
    },
    getAllProducts (customerId) {
        return apiRequest(axiosInstance.get(URL + "/api/cart/" + customerId))

    },
    updateQuantity(quantityRequest){
        return apiRequest(axiosInstance.post(URL + "/api/cart/update-quantity", quantityRequest))
    },
    deleteProduct(productId, customerId){
        return apiRequest(axiosInstance.delete(`${URL}/api/cart/delete/${productId}?customerId=${customerId}`))
    }
}

export default CartService