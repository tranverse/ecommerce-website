package com.ecommerce.enums;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum EmployeeRole {
    ADMIN("ADMIN"),
    MANAGER("Quản lý"),
    STAFF("Nhân viên");

    private final String value;

    @JsonValue
    public String getValue() {
        return value;
    }

    public static EmployeeRole fromValue(String value) {
        for (EmployeeRole role : EmployeeRole.values()) {
            if (role.value.equals(value)) {
                return role;
            }
        }
        return null;
    }

}
