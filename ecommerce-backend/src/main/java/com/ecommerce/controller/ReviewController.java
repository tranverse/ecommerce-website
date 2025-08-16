package com.ecommerce.controller;

import com.ecommerce.dto.ApiResponse;
import com.ecommerce.dto.Review.ReviewRequest;
import com.ecommerce.dto.Review.ReviewResponse;
import com.ecommerce.dto.product.ProductRequest;
import com.ecommerce.dto.product.ProductResponse;
import com.ecommerce.service.ReviewService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/review")
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
@RequiredArgsConstructor
public class ReviewController {
    final ReviewService reviewService;

    @GetMapping("/{productId}")
    public ResponseEntity<ApiResponse<List<ReviewResponse>>> getReviewOfProduct(@PathVariable String productId) {
        return ResponseEntity.ok(
                ApiResponse.<List<ReviewResponse>>builder()
                        .success(true)
                        .code("Review-s-get")
                        .message("Update review successfully")
                        .data(reviewService.getReviewOfProduct(productId))
                        .build()
        );
    }

    @PostMapping
    public ResponseEntity<ApiResponse<List<ReviewResponse>>> addReview(@RequestBody List<ReviewRequest> reviewRequest) {
        return ResponseEntity.ok(
                ApiResponse.<List<ReviewResponse>>builder()
                        .success(true)
                        .code("Review-s-add")
                        .message("Add review successfully")
                        .data(reviewService.addReview(reviewRequest))
                        .build()
        );
    }


}
