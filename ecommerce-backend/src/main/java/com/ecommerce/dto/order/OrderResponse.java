package com.ecommerce.dto.order;

import com.ecommerce.enums.OrderStatus;
import com.ecommerce.enums.PaymentMethod;
import com.ecommerce.model.Customer;
import com.ecommerce.model.OrderDetail;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class OrderResponse {
    private String id;

    private String orderCode;

    private BigDecimal totalPrice;

    private BigDecimal totalProductPrice;

    private LocalDateTime orderDate;

    private String shippingAddress;

    private String shippingPhone;

    private String shippingCustomerName;

    private OrderStatus status;

    private Customer customer;

    private BigDecimal shippingAmount;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    private List<OrderDetailResponse> orderDetails;
}
