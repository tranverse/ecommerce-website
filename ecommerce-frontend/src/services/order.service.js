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
    },
    getAllOrder(){
        return apiRequest(axiosInstance.get(URL + `/api/order/get-all`))
    },
    getAllOrderById(orderId){
        return apiRequest(axiosInstance.get(URL + `/api/order/detail/${orderId}`))
    },
    getOrderStatus(){
        return apiRequest(axiosInstance.get(URL + `/api/order/status`))
    },
    updateOrderStatus(data){
        return apiRequest(axiosInstance.put(URL + `/api/order/update-order-status`, data))
    },
    cancelOrder(orderId){
        return apiRequest(axiosInstance.put(URL + `/api/order/cancel/${orderId}`))
    },
    addReview(data){
        return apiRequest(axiosInstance.post(URL + `/api/review`, data))
    }
}
export default OrderService