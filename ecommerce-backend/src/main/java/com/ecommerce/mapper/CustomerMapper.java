package com.ecommerce.mapper;

import com.ecommerce.dto.customer.CustomerResponse;
import com.ecommerce.model.Customer;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CustomerMapper {
    CustomerResponse toCustomerResponse(Customer customer);
}
