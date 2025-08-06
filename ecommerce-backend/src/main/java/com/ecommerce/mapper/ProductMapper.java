package com.ecommerce.mapper;

import com.ecommerce.dto.cart.CartDetailResponse;
import com.ecommerce.dto.product.ProductRequest;
import com.ecommerce.dto.product.ProductResponse;
import com.ecommerce.model.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    Product toProduct(ProductRequest productRequest);

    ProductResponse toProductResponse(Product product);

    List<ProductResponse> toProductResponseList(List<Product> productList);

//    CartDetailResponse.ProductDTO toProductDTO(CartDetailResponse cartDetailResponse);
}
