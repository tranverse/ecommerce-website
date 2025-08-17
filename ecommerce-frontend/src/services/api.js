import axios from "axios";
const URL = 'http://localhost:8080'

const axiosInstance = axios.create({
    baseURL: URL,
    headers: {
        "Content-Type" : "application/json"
    }
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken') || localStorage.getItem('employeeAccessToken')

        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

export async function apiRequest(axiosPromise, getData = false) {
    try {
        const response = await axiosPromise;
        const result = getData ? response.data.data : {data: response.data, status: response.status}
        return result
    } catch (error) {
        return error.response
    }

} 
export default axiosInstance