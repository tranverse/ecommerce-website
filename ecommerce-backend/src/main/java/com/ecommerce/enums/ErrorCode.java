package com.ecommerce.enums;

import lombok.Getter;

@Getter
public enum ErrorCode {

    USER_EXITED(100, "User existed"),
    WRONG_PASSWORD(101, "Wrong password"),
    USER_NOT_FOUND(102, "User not found"),
    EMAIL_EXISTED(103, "Email already existed"),
    EMPLOYEE_EXISTED(104, "Employee already existed"),
    EMAIL_NOT_FOUND(105, "Email not found"),;





    private final int code;
    private final String message;
    ErrorCode(int code, String message){
        this.code = code;
        this.message = message;
    }

}
