package com.ecommerce.dto.Category;

import com.ecommerce.model.Category;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CategoryResponse {
    private String id;
    private String name;
    private String thumbnail;
    private List<Category> subCategories;
    private Category parentCategory;

}
