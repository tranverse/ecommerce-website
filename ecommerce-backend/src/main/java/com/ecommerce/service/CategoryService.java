package com.ecommerce.service;

import com.ecommerce.dto.Category.CategoryRequest;
import com.ecommerce.dto.Category.CategoryResponse;
import com.ecommerce.mapper.CategoryMapper;
import com.ecommerce.model.Category;
import com.ecommerce.repository.CategoryRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)

public class CategoryService {
    final CategoryRepository categoryRepository;
    final CategoryMapper categoryMapper;

    public CategoryResponse addCategory(CategoryRequest categoryRequest) {
        Category category = categoryMapper.toCategory(categoryRequest);
        categoryRepository.save(category);
        return categoryMapper.toCategoryResponse(category);
    }

    public List<CategoryResponse> getAllCategories() {
        List<Category> categories = categoryRepository.findAllByParentCategoryIsNull();
        return categoryMapper.toCategoryResponseList(categories);
    }

    public CategoryResponse getCategoryById(String categoryId) {
        Category category = categoryRepository.findById(categoryId).orElse(null);
        return categoryMapper.toCategoryResponse(category);
    }

    public CategoryResponse updateCategory(String categoryId, CategoryRequest categoryRequest) {
        Category category = categoryRepository.findById(categoryId).orElse(null);
        System.out.println(categoryRequest.getName());
        if (categoryRequest.getName() != null) {
            category.setName(categoryRequest.getName());
        }
        if (categoryRequest.getThumbnail() != null) {
            category.setThumbnail(categoryRequest.getThumbnail());
        }

        if (category.getSubCategories() != null && !category.getSubCategories().isEmpty()) {
            category.setParentCategory(null);
        } else {
            if (categoryRequest.getParentCategory() != null && categoryRequest.getParentCategory().getId() != null) {
                Category parent = categoryRepository.findById(categoryRequest.getParentCategory().getId())
                        .orElseThrow(() -> new RuntimeException("Parent category not found"));
                category.setParentCategory(parent);
            } else {
                category.setParentCategory(null);
            }
        }

       categoryRepository.save(category);

        return categoryMapper.toCategoryResponse(category);
    }
}
