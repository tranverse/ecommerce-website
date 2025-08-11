import axiosInstance, { apiRequest } from "./api";
const URL = 'http://localhost:8080'

const BannerService = {
    addBanner(payload){
        return apiRequest(axiosInstance.post(URL + "/api/banner", payload))
    },
    getBannersInTime(){
        return apiRequest(axiosInstance.get(URL + "/api/banner"))

    }
}

export default BannerService