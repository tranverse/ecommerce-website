package com.ecommerce.dto.order;

import com.ecommerce.enums.OrderStatus;
import com.ecommerce.model.*;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailResponse {

    private String id;

    private Integer quantity;

    private BigDecimal discountPrice;

    private BigDecimal totalPrice;

    private BigDecimal originalPrice;

    private Product product;

    private Variant variant;


}
