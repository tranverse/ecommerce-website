package com.ecommerce.exception;

import com.ecommerce.enums.ErrorCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class AppException extends RuntimeException {
    private final Integer code;
    private final HttpStatus httpStatus;
    public AppException(ErrorCode errorCode, HttpStatus httpStatus) {
        super(errorCode.getMessage());
        this.code = errorCode.getCode();
        this.httpStatus = httpStatus;
    }
}
