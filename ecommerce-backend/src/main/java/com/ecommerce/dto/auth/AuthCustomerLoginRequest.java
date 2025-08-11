package com.ecommerce.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuthCustomerLoginRequest {
    private String email;
    private String password;
    private String type;
}
