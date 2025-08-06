package com.ecommerce.dto.cart;

import com.ecommerce.model.Customer;
import com.ecommerce.model.Product;
import com.ecommerce.model.Variant;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CartRequest {
    private Integer quantity;
    private Customer customer;
    private Product product;
    private Variant variant;
}
