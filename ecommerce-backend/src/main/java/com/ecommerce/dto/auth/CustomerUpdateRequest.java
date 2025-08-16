package com.ecommerce.dto.auth;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class CustomerUpdateRequest {
    private String name;

    private String email;

    private String phone;

    private String password;

}
