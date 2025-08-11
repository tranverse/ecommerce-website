package com.ecommerce.dto.auth;

import com.ecommerce.enums.EmployeeRole;
import com.ecommerce.model.Employee;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuthEmployeeResponse {
    private String accessToken;
    private EmployeeResponse employee;
}
