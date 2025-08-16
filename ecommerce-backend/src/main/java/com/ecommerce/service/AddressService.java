package com.ecommerce.service;

import com.ecommerce.dto.Address.AddressRequest;
import com.ecommerce.dto.Address.AddressResponse;
import com.ecommerce.enums.ErrorCode;
import com.ecommerce.exception.AppException;
import com.ecommerce.model.Address;
import com.ecommerce.model.CustomerAddress;
import com.ecommerce.repository.AddressRepository;
import com.ecommerce.repository.CustomerAddressRepository;
import com.ecommerce.repository.CustomerRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AddressService {
    final AddressRepository addressRepository;
    final CustomerRepository customerRepository;
    final CustomerAddressRepository customerAddressRepository;

    public AddressResponse addAddress(AddressRequest addressRequest) {
        boolean hasAddress = customerAddressRepository.existsByCustomerId(addressRequest.getCustomer().getId());

        // Nếu địa chỉ mới muốn là default, cập nhật các địa chỉ khác của khách hàng về false
        if (Boolean.TRUE.equals(addressRequest.getIsDefault())) {
            customerAddressRepository.updateIsDefaultForCustomer(addressRequest.getCustomer().getId());
        }

        Address address = Address.builder()
                .province(addressRequest.getAddress().getProvince())
                .district(addressRequest.getAddress().getDistrict())
                .ward(addressRequest.getAddress().getWard())
                .details(addressRequest.getAddress().getDetails())
                .build();
        addressRepository.save(address);

        // Tạo CustomerAddress mới
        CustomerAddress customerAddress = CustomerAddress.builder()
                .address(address)
                .customerName(addressRequest.getCustomerName())
                .phone(addressRequest.getPhone())
                .isDefault(addressRequest.getIsDefault())
                .customer(addressRequest.getCustomer())
                .build();
        customerAddressRepository.save(customerAddress);

        // Trả về response
        return AddressResponse.builder()
                .address(address)
                .customerName(customerAddress.getCustomerName())
                .phone(customerAddress.getPhone())
                .isDefault(customerAddress.getIsDefault())
                .id(customerAddress.getId())
                .build();
    }


    public List<AddressResponse> getAddressesByCustomerId(String customerId) {
        List<CustomerAddress> customerAddresses = customerAddressRepository.findByCustomerId(customerId);

        return customerAddresses.stream()
                .map(ca -> AddressResponse.builder()
                        .address(ca.getAddress())
                        .customerName(ca.getCustomerName())
                        .phone(ca.getPhone())
                        .isDefault(ca.getIsDefault())
                        .id(ca.getId())
                        .build())
                .toList();
    }

    public AddressResponse updateAddress(String id, AddressRequest addressRequest) {
        CustomerAddress customerAddress = customerAddressRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND, HttpStatus.NOT_FOUND));

        if (Boolean.TRUE.equals(addressRequest.getIsDefault())) {
            customerAddressRepository.updateIsDefaultForCustomer(addressRequest.getCustomer().getId());
        }

        // Cập nhật Address
        Address address = customerAddress.getAddress();
        address.setProvince(addressRequest.getAddress().getProvince());
        address.setDistrict(addressRequest.getAddress().getDistrict());
        address.setWard(addressRequest.getAddress().getWard());
        address.setDetails(addressRequest.getAddress().getDetails());
        addressRepository.save(address);

        // Cập nhật CustomerAddress
        customerAddress.setCustomerName(addressRequest.getCustomerName());
        customerAddress.setPhone(addressRequest.getPhone());
        customerAddress.setIsDefault(addressRequest.getIsDefault());
        customerAddressRepository.save(customerAddress);

        return AddressResponse.builder()
                .address(address)
                .customerName(customerAddress.getCustomerName())
                .phone(customerAddress.getPhone())
                .isDefault(customerAddress.getIsDefault())
                .id(customerAddress.getId())
                .build();
    }

    public Void deleteAddress(String id) {
        CustomerAddress customerAddress = customerAddressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy địa chỉ"));

        // Xóa liên kết
        customerAddressRepository.delete(customerAddress);

        // Xóa Address gốc
        addressRepository.delete(customerAddress.getAddress());
        return null;
    }

    public AddressResponse setDefaultAddress(String customerAddressId) {
        CustomerAddress target = customerAddressRepository.findById(customerAddressId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy địa chỉ"));

        // Bỏ mặc định các địa chỉ khác của customer
        customerAddressRepository.updateIsDefaultForCustomer(target.getCustomer().getId());

        // Set lại mặc định cho địa chỉ này
        target.setIsDefault(true);
        customerAddressRepository.save(target);

        // Trả về response
        return AddressResponse.builder()
                .address(target.getAddress())
                .customerName(target.getCustomerName())
                .phone(target.getPhone())
                .isDefault(target.getIsDefault())
                .id(target.getId())
                .build();
    }

    public AddressResponse getDefaultAddress(String customerId) {
        Optional<CustomerAddress> optionalAddress = customerAddressRepository
                .findByCustomerIdAndIsDefault(customerId, true);

        if (optionalAddress.isEmpty()) {
            return null;
        }

        CustomerAddress customerAddress = optionalAddress.get();
        return AddressResponse.builder()
                .address(customerAddress.getAddress())
                .customerName(customerAddress.getCustomerName())
                .phone(customerAddress.getPhone())
                .isDefault(customerAddress.getIsDefault())
                .id(customerAddress.getId())
                .build();
    }



}
