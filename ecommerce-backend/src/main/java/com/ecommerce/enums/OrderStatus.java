package com.ecommerce.enums;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum OrderStatus {
    PENDING("Chờ xác nhận"),
    PROCESSING("Đang xử lý"),
    DELIVERY("Đang giao hàng"),
    CANCELLED("Đã hủy"),
    COMPLETED("Hoàn thành");

    private final String value;

    @JsonValue
    public String getValue() {
        return value;
    }

    public static OrderStatus fromValue(String v) {
        for (OrderStatus c : OrderStatus.values()) {
            if (c.value.equals(v)) {
                return c;
            }
        }
        return null;
    }
}
