package com.ecommerce.dto.order;

import com.ecommerce.enums.OrderStatus;
import com.ecommerce.enums.PaymentMethod;
import com.ecommerce.model.Customer;
import com.ecommerce.model.Product;
import com.ecommerce.model.Variant;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequest {

    private BigDecimal totalPrice;

    private BigDecimal discountPrice;

    private String shippingAddress;

    private OrderStatus status;

    private Customer customer;

    private BigDecimal shippingAmount;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    private List<ProductOrderDTO> products;

    @Data
    public static class ProductOrderDTO {
        private Product product;
        private Variant variant;
        private Integer quantity;
        private BigDecimal discountPrice;
        private BigDecimal totalPrice;
        private BigDecimal originalPrice;
    }
}
