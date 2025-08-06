import axios from "axios";
const URL = 'http://localhost:8080'

const axiosInstance = axios.create({
    baseURL: URL,
    headers: {
        "Content-Type" : "application/json"
    }
})

export async function apiRequest(axiosPromise, getData = false) {
    try {
        const response = await axiosPromise;
        const result = getData ? response.data.data : {data: response.data, status: response.status}
        console.log(result)

        return result
    } catch (error) {
        console.log(error)
        throw error.response?.data || error
    }

} 
export default axiosInstance