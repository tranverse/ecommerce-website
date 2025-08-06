package com.ecommerce.mapper;

import com.ecommerce.dto.Category.CategoryRequest;
import com.ecommerce.dto.Category.CategoryResponse;
import com.ecommerce.model.Category;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    Category toCategory(CategoryRequest categoryRequest);

    CategoryResponse toCategoryResponse(Category category);

    List<CategoryResponse> toCategoryResponseList(List<Category> categoryList);
}
