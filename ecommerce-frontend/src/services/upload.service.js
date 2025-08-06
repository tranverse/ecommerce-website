import axios from "axios"
import { apiRequest } from "./api"
const URL = 'http://localhost:8080'

const UploadService = {
    uploadImages(data){
        return apiRequest(axios.post(URL + '/api/upload/multi', data, {
            headers: {
                "Content-Type" : "multipart/form-data"
            }
        }))
    },
        uploadSingleImage(data){
        return apiRequest(axios.post(URL + '/api/upload/single', data, {
            headers: {
                "Content-Type" : "multipart/form-data"
            }
        }))
    },

}
export default UploadService