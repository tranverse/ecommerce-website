import AddressService from "@services/address.service";

export const getAddressNames = async (provinceCode, districtCode, wardCode) => {
    const provinceResponse = await AddressService.getProviceName(provinceCode);
    const districtResponse = await AddressService.getDistrictName(districtCode);
    const wardResponse = await AddressService.getWardName(wardCode);
    return {
        province: provinceResponse,
        district: districtResponse,
        ward: wardResponse,
    };
};
