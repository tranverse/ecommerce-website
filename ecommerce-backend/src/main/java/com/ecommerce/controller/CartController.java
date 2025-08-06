package com.ecommerce.controller;

import com.ecommerce.dto.ApiResponse;
import com.ecommerce.dto.cart.CartDetailResponse;
import com.ecommerce.dto.cart.CartRequest;
import com.ecommerce.dto.cart.QuantityRequest;
import com.ecommerce.service.CartService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class CartController {
    final CartService cartService;

    @PostMapping
    public ResponseEntity<ApiResponse<CartDetailResponse>> addProductToCart(@RequestBody CartRequest cartRequest) {
        return ResponseEntity.ok(
                ApiResponse.<CartDetailResponse>builder()
                        .code("Cart-s-add")
                        .message("Add product to cart")
                        .data(cartService.addProductToCart(cartRequest))
                        .build()
        );
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<ApiResponse<List<CartDetailResponse>>> getAllProductsByCart(@PathVariable String customerId ) {
        return ResponseEntity.ok(
                ApiResponse.<List<CartDetailResponse>>builder()
                        .code("Cart-s-get-all")
                        .message("Add product to cart")
                        .data(cartService.getAllCartDetails(customerId))
                        .build()
        );
    }

    @PostMapping("/update-quantity")
    public ResponseEntity<ApiResponse<Object>> updateQuantity(@RequestBody QuantityRequest quantityRequest) {
        return ResponseEntity.ok(
                ApiResponse.<Object>builder()
                        .code("Cart-s-update-quantity")
                        .message("Update quantity")
                        .data(cartService.updateQuantity(quantityRequest))
                        .build()
        );

    }
    @DeleteMapping("/delete/{productId}")
    public ResponseEntity<ApiResponse<String>> deleteProduct(@PathVariable String productId, @RequestParam  String customerId) {
        return ResponseEntity.ok(
                ApiResponse.<String>builder()
                        .code("Cart-s-update-quantity")
                        .message("Update quantity")
                        .data(cartService.deleteProductFromCart(productId, customerId))
                        .build()
        );

    }
}
