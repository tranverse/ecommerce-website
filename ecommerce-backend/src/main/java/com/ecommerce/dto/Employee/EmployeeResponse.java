package com.ecommerce.dto.Employee;

import com.ecommerce.enums.EmployeeRole;
import com.ecommerce.model.Address;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeResponse {
    private String id;

    private String name;

    private String phone;

    private String email;

    private String avatar;

    @Enumerated(EnumType.STRING)
    private EmployeeRole role;

    private Address address;
}
