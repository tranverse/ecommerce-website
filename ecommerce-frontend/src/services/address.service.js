import { apiRequest } from "./api";
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
}
export default AddressService