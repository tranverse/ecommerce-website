package com.ecommerce.enums;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@AllArgsConstructor
public enum ProductStatus {
    AVAILABLE("Có sẵn"),
    OUT_OF_STOCK("Hết hàng"),
    INACTIVE("Ngừng kinh doanh");

    private final String value;

    @JsonValue
    public String getValue() {
        return value;
    }

}
