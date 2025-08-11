package com.ecommerce.dto.customer;

import lombok.Getter;

@Getter
public class CustomerRequest {
    private String name;
    private String email;
    private String phone;
    private String password;
}
