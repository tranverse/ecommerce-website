package com.ecommerce.dto.cart;

import com.ecommerce.dto.product.ProductResponse;
import com.ecommerce.model.Cart;
import com.ecommerce.model.Customer;
import com.ecommerce.model.Product;
import com.ecommerce.model.Variant;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class CartDetailResponse {
    private String id;
    private Product product;
    private Integer quantity;
    private Variant variant;
//    @Data
//    public static class ProductDTO{
//        private String name;
//        private BigDecimal price;
//        private String thumbnail;
//    }


}
