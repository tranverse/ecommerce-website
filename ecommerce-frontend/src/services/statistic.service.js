import axios from "axios"
import axiosInstance, { apiRequest } from "./api"
const URL = 'http://localhost:8080'

const StatisticService = {
    getStatisticService(){
        return apiRequest(axiosInstance.get(URL + "/api/statistic"))
    }
}   
export default StatisticService