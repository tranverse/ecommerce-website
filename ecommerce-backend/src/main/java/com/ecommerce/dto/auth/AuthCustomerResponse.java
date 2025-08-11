package com.ecommerce.dto.auth;

import com.ecommerce.model.Customer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class AuthCustomerResponse {
    private String accessToken;
    Customer customer;
}
