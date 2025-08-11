package com.ecommerce.controller;

import com.cloudinary.Api;
import com.ecommerce.dto.ApiResponse;
import com.ecommerce.dto.Category.CategoryRequest;
import com.ecommerce.dto.Category.CategoryResponse;
import com.ecommerce.service.CategoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/category")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryController {
    final CategoryService categoryService;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<ApiResponse<CategoryResponse>> addCategory(@RequestBody CategoryRequest categoryRequest) {
        return ResponseEntity.ok(
                ApiResponse.<CategoryResponse>builder()
                        .message("Add category")
                        .code("Category-s-add")
                        .data(categoryService.addCategory(categoryRequest))
                        .build()
        );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<CategoryResponse>>> getAllCategories() {
        return ResponseEntity.ok(
                ApiResponse.<List<CategoryResponse>>builder()
                        .message("Add category")
                        .code("Category-s-add")
                        .data(categoryService.getAllCategories())
                        .build()
        );
    }
}
