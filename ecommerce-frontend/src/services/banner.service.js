import axiosInstance, { apiRequest } from "./api";
const URL = 'http://localhost:8080'

const BannerService = {
    addBanner(payload){
        return apiRequest(axiosInstance.post(URL + "/api/banner", payload))
    },
    getBannersInTime(){
        return apiRequest(axiosInstance.get(URL + "/api/banner/in-time"))
    },
    getAllBanner(){
        return apiRequest(axiosInstance.get(URL + "/api/banner"))
    },
    getBannerById(id){
        return apiRequest(axiosInstance.get(URL + `/api/banner/${id}`))
    },
    updateBanner(id, data){
        return apiRequest(axiosInstance.put(URL + `/api/banner/${id}`, data))       
    }
}

export default BannerService