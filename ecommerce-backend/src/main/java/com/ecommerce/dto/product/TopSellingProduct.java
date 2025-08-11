package com.ecommerce.dto.product;

import com.ecommerce.model.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TopSellingProduct {
    private Product product;
    public Long quantity;
}
