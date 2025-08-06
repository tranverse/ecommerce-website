package com.ecommerce.controller;

import com.ecommerce.dto.ApiResponse;
import com.ecommerce.dto.customer.CustomerRequest;
import com.ecommerce.dto.customer.CustomerResponse;
import com.ecommerce.service.CustomerService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customer")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class CustomerController {
    final CustomerService customerService;

    @PostMapping
    public ResponseEntity<ApiResponse<CustomerResponse>> addCustomer(@ModelAttribute CustomerRequest customerRequest) {
        return ResponseEntity.ok(
                ApiResponse.<CustomerResponse>builder()
                        .message("Add new customer")
                        .data(customerService.addCustomer(customerRequest))
                        .code("Customer-s-add")
                        .build()
        );
    }
}
