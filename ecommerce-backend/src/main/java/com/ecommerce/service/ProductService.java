package com.ecommerce.service;

import com.ecommerce.dto.product.ProductRequest;
import com.ecommerce.dto.product.ProductResponse;
import com.ecommerce.enums.ProductStatus;
import com.ecommerce.mapper.ProductMapper;
import com.ecommerce.model.Image;
import com.ecommerce.model.Product;
import com.ecommerce.model.Variant;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.util.SlugUtil;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Transactional
public class ProductService {
    final ProductRepository productRepository;
    final ProductMapper productMapper;

    public List<ProductResponse> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return productMapper.toProductResponseList(products);
    }
    public ProductResponse getProduct(String id) {
        Product product = productRepository.findById(id).orElse(null);
        return productMapper.toProductResponse(product);
    }

    public ProductResponse addProduct(ProductRequest productRequest) {
        Product product = productMapper.toProduct(productRequest);
        String slug = SlugUtil.toSlug(product.getName() + "." + SlugUtil.generateRandomNumber());
        product.setSlug(slug);

        if(productRequest.getImages() != null) {
            List<Image> images = productRequest.getImages().stream().map(image -> {
                Image newImage = new Image();
                newImage.setUrl(image.getUrl());
                newImage.setColor(image.getColor());
                newImage.setProduct(product);
                return newImage;
            }).collect(Collectors.toList());
            product.setImages(images);
        }

        if (productRequest.getVariants() != null) {
            List<Variant> variants = productRequest.getVariants().stream().map(variant -> {
                Variant newVariant = new Variant();
                newVariant.setColor(variant.getColor());
                newVariant.setQuantity(variant.getQuantity());
                newVariant.setSize(variant.getSize());
                newVariant.setProduct(product);
                return newVariant;
            }).collect(Collectors.toList());
            product.setVariants(variants);
        }

        productRepository.save(product);


        return productMapper.toProductResponse(product);
    }

    public List<ProductStatus> getProductStatuses() {
        return Arrays.asList(ProductStatus.values());
    }
}
