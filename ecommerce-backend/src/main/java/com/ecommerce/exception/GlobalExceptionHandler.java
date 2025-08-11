package com.ecommerce.exception;

import com.ecommerce.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(AppException.class)
    public ResponseEntity<ApiResponse<Void>> handleAppException(AppException e) {
        ApiResponse<Void> apiResponse = ApiResponse.<Void>builder()
                .success(false)
                .code(e.getCode().toString())
                .message(e.getMessage())
                .build();
        return ResponseEntity.status(e.getHttpStatus()).body(apiResponse);
    }
}
