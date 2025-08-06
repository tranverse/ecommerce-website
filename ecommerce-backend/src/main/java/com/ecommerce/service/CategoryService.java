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
}
