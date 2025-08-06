package com.ecommerce.dto.product;

import com.ecommerce.enums.ProductStatus;
import com.ecommerce.model.Category;
import com.ecommerce.model.Image;
import com.ecommerce.model.Variant;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequest {
    private String id;
    private String name;
    private String description;
    private BigDecimal price;
    private Double discountPercentage;
    private String slug;
    private String origin;
    private ProductStatus status;
    private Category category;
    private String thumbnail;
    private List<ImagesDTO> images;
    private List<VariantDTO> variants;


    @Data
    public static class ImagesDTO {
        private String url;
        private String color;
    }

    @Data
    public static class VariantDTO {
        private String color;
        private String size;
        private Integer quantity;
    }
}


