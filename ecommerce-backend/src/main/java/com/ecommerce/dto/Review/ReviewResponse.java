package com.ecommerce.dto.Review;

import com.ecommerce.model.Customer;
import com.ecommerce.model.Order;
import com.ecommerce.model.Product;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewResponse {
    private String comment;

    private Float rating;

    private LocalDateTime createdAt;

    private Customer customer;

    private Product product;


}
