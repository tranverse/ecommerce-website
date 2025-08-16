package com.ecommerce.dto.Review;

import com.ecommerce.model.Customer;
import com.ecommerce.model.Product;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReviewRequest {
    private String orderId;

    private String comment;

    private Float rating;

    private Customer customer;

    private Product product;
}
