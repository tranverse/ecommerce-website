package com.ecommerce.controller;

import com.ecommerce.dto.ApiResponse;
import com.ecommerce.dto.Employee.EmployeeResponse;
import com.ecommerce.dto.auth.AuthCustomerLoginRequest;
import com.ecommerce.dto.auth.AuthCustomerResponse;
import com.ecommerce.dto.auth.AuthEmployeeResponse;
import com.ecommerce.dto.Employee.EmployeeRequest;
import com.ecommerce.dto.customer.CustomerRequest;
import com.ecommerce.dto.customer.CustomerResponse;
import com.ecommerce.model.Employee;
import com.ecommerce.service.AuthService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class AuthController {
    final AuthService authService;

    @PostMapping("/customer/register")
    public ResponseEntity<ApiResponse<CustomerResponse>> addCustomer(@RequestBody CustomerRequest customerRequest) {
        return ResponseEntity.ok(
                ApiResponse.<CustomerResponse>builder()
                        .message("Add new customer")
                        .data(authService.addCustomer(customerRequest))
                        .code("Customer-s-add")
                        .build()
        );
    }
    @PostMapping("/customer/login")
    public ResponseEntity<ApiResponse<AuthCustomerResponse>> customerLogin(@RequestBody AuthCustomerLoginRequest authCustomerLoginRequest) {
        return ResponseEntity.ok(
                ApiResponse.<AuthCustomerResponse>builder()
                        .message("Login successfully")
                        .data(authService.customerLogin(authCustomerLoginRequest))
                        .code("Customer-s-login")
                        .build()
        );
    }


    @PostMapping("/employee/login")
    public ResponseEntity<ApiResponse<AuthEmployeeResponse>> employeeLogin(@RequestBody AuthCustomerLoginRequest loginRequest) {
        return ResponseEntity.ok(
                ApiResponse.<AuthEmployeeResponse>builder()
                        .message("Employee login successfully")
                        .data(authService.employeeLogin(loginRequest))
                        .code("Employee-s-login")
                        .build()
        );
    }
}
