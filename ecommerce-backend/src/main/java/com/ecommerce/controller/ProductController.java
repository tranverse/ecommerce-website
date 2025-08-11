package com.ecommerce.controller;

import com.ecommerce.dto.ApiResponse;
import com.ecommerce.dto.product.ProductRequest;
import com.ecommerce.dto.product.ProductResponse;
import com.ecommerce.dto.product.TopSellingProduct;
import com.ecommerce.enums.ProductStatus;
import com.ecommerce.service.ProductService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ProductController {
    final ProductService productService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductResponse>>> getAllProducts() {

        ApiResponse<List<ProductResponse>>  apiResponse = ApiResponse.<List<ProductResponse>>builder()
                .success(true)
                .code("Product-s-get")
                .message("Get product list successfully")
                .data(productService.getAllProducts())
                .build();

        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductResponse>> getProduct(@PathVariable String id) {

        ApiResponse<ProductResponse>  apiResponse = ApiResponse.<ProductResponse>builder()
                .success(true)
                .code("Product-s-get")
                .message("Get product list successfully")
                .data(productService.getProduct(id))
                .build();

        return ResponseEntity.ok(apiResponse);
    }


    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<ApiResponse<ProductResponse>> addProduct(@RequestBody ProductRequest productRequest) {
        return ResponseEntity.ok(
                ApiResponse.<ProductResponse>builder()
                        .success(true)
                        .code("Product-s-add")
                        .message("Add product successfully")
                        .data(productService.addProduct(productRequest))
                        .build()
        );
    }


    @GetMapping("/status")
    public ResponseEntity<ApiResponse<List<ProductStatus>>> getProductStatus() {
        return ResponseEntity.ok(
                ApiResponse.<List<ProductStatus>>builder()
                        .success(true)
                        .code("Product-s-add")
                        .message("Add product successfully")
                        .data(productService.getProductStatuses())
                        .build()
        );
    }

    @GetMapping("/on-sale")
    public ResponseEntity<ApiResponse<List<ProductResponse>>> getProductOnSale() {
        return ResponseEntity.ok(
                ApiResponse.<List<ProductResponse>>builder()
                        .success(true)
                        .code("Product-s-get-on-sale")
                        .message("Get product on sale successfully")
                        .data(productService.getAllProductAllSale())
                        .build()
        );
    }

    @GetMapping("/top-selling")
    public ResponseEntity<ApiResponse<List<ProductResponse>>> getProductTopSelling() {
        return ResponseEntity.ok(
                ApiResponse.<List<ProductResponse>>builder()
                        .success(true)
                        .code("Product-s-get-top-selling")
                        .message("Get top five product selling successfully")
                        .data(productService.getTopFiveProducts())
                        .build()
        );
    }


}
