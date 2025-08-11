package com.ecommerce.dto.auth;

import com.ecommerce.enums.EmployeeRole;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeRequest {
    private String name;

    private String phone;

    private String email;

    private String password;

    private String avatar;

    @Enumerated(EnumType.STRING)
    private EmployeeRole role;
}
