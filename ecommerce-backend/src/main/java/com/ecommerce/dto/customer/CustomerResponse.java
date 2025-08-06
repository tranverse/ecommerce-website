package com.ecommerce.dto.customer;

import com.ecommerce.enums.CustomerTire;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;

@Getter
public class CustomerResponse {
    private String id;
    private String name;
    private String email;
    private String phone;
    @Enumerated(EnumType.STRING)
    private CustomerTire tire;
}
