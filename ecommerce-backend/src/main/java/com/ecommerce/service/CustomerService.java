package com.ecommerce.service;

import com.ecommerce.dto.customer.CustomerRequest;
import com.ecommerce.dto.customer.CustomerResponse;
import com.ecommerce.enums.CustomerTire;
import com.ecommerce.mapper.CustomerMapper;
import com.ecommerce.model.Customer;
import com.ecommerce.repository.CustomerRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CustomerService {
    final CustomerRepository customerRepository;
    final CustomerMapper customerMapper;
    public CustomerResponse addCustomer(CustomerRequest customerRequest) {
        Customer customer = new Customer();
        customer.setName(customerRequest.getName());
        customer.setEmail(customerRequest.getEmail());
        customer.setPhone(customerRequest.getPhone());
        customer.setTire(CustomerTire.STANDARD);
        customerRepository.save(customer);

        return customerMapper.toCustomerResponse(customer);
    }
}
