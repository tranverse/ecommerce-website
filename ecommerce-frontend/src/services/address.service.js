import axiosInstance, { apiRequest } from "./api";
const URL = 'http://localhost:8080'

const AddressService = {
    async getProvince(){
        const response = await fetch('https://provinces.open-api.vn/api/p/?depth=3')
        return response.json()
    },
    async getDistrict(provinceCode){
        const response = await fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
        return response.json()
    },
    async getWard(districtCode){
        const response = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
        return response.json()
    },
    async getProviceName(provinceCode){
        const response = await fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=1`);
        const data = await response.json(); 
        return data.name; 
    },
    async getDistrictName(districtCode){
        const response = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=1`);
        const data = await response.json(); 
        return data.name;     },
    async getWardName(ward){
        const response = await fetch(`https://provinces.open-api.vn/api/v2/w/${ward}`);
        const data = await response.json(); 
                console.log('ward data:', data); // xem API trả về gì

        return data.name; 
    },
    addAddress(data){
         return apiRequest(axiosInstance.post(URL + `/api/address`, data))
    },
    updateAddress(cusstomerAddressId, data){
        return apiRequest(axiosInstance.put(URL + `/api/address/${cusstomerAddressId}`, data))

    },
    setDefault(id){
        return apiRequest(axiosInstance.put(URL + `/api/address/${id}/default`))
    },
    remove(id){
        return apiRequest(axiosInstance.delete(URL + `/api/address/${id}`))
    },
    getByCustomerId(customerId){
        return apiRequest(axiosInstance.get(URL + `/api/address/customer/${customerId}`))
    },
    getDefault(customerId){
        return apiRequest(axiosInstance.get(URL + `/api/address/${customerId}/default`))
    },
    
}
export default AddressService