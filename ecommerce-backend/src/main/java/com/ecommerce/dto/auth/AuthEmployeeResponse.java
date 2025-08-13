package com.ecommerce.dto.auth;

import com.ecommerce.dto.Employee.EmployeeResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuthEmployeeResponse {
    private String accessToken;
    private EmployeeResponse employee;
}
