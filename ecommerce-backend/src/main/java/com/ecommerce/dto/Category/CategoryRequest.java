package com.ecommerce.dto.Category;

import com.ecommerce.model.Category;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryRequest {
    private String name;
    private Category parentCategory;
    private String thumbnail;
}
