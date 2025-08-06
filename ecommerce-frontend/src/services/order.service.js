import axiosInstance, { apiRequest } from "./api"
const URL = 'http://localhost:8080'

const OrderService = {
    addOrder(payload){
        return apiRequest(axiosInstance.post(URL + "/api/order", payload))
    },
    getAllOrderByCustomer(customerId){
        return apiRequest(axiosInstance.get(URL + `/api/order/${customerId}`))
    },
    getOrderDetail(orderId){
        return apiRequest(axiosInstance.get(URL + `/api/order/detail/${orderId}`))
    }

}
export default OrderService