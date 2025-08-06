package com.ecommerce.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApiResponse<T> {
    @Builder.Default
    private Boolean success = true;
    private String code;
    private String message;
    private T data;
}
