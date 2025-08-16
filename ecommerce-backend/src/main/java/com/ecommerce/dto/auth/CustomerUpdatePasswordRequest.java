package com.ecommerce.dto.auth;

import lombok.Data;

@Data
public class CustomerUpdatePasswordRequest {
    private String oldPassword;
    private String newPassword;
}
