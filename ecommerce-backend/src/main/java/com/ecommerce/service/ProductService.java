package com.ecommerce.service;

import com.ecommerce.dto.product.ProductRequest;
import com.ecommerce.dto.product.ProductResponse;
import com.ecommerce.dto.product.TopSellingProduct;
import com.ecommerce.enums.ProductStatus;
import com.ecommerce.exception.AppException;
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
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Transactional
public class ProductService {
    final ProductRepository productRepository;
    final ProductMapper productMapper;

    public List<ProductResponse> getAllProducts() {
        List<TopSellingProduct> topSellingProducts = productRepository.getSaleVolume();
        return topSellingProducts.stream().map(
                product -> {
                    ProductResponse productResponse = productMapper.toProductResponse(product.getProduct());
                    productResponse.setSaleVolume(product.getQuantity());
                    return productResponse;
                }
        ).toList();
    }

    public ProductResponse getProduct(String id) {
        Product product = productRepository.findById(id).orElse(null);
        return productMapper.toProductResponse(product);
    }

    public ProductResponse addProduct(ProductRequest productRequest) {
        Product product = productMapper.toProduct(productRequest);
        String slug = SlugUtil.toSlug(product.getName() + "." + SlugUtil.generateRandomNumber());
        product.setSlug(slug);
        product.setStatus(productRequest.getStatus());
        System.out.println(productRequest.getStatus());
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

    public ProductResponse updateProduct(String productId, ProductRequest productRequest) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));

        // Cập nhật thông tin cơ bản
        System.out.println(productRequest.getStatus().toString());
        product.setName(productRequest.getName());
        product.setDescription(productRequest.getDescription());
        product.setPrice(productRequest.getPrice());
        product.setDiscountPercentage(productRequest.getDiscountPercentage());
        product.setOrigin(productRequest.getOrigin());
        product.setStatus(productRequest.getStatus());
        product.setCategory(productRequest.getCategory());
        System.out.println(ProductStatus.fromValue(productRequest.getStatus().toString()));
        // Slug mới
        String slug = SlugUtil.toSlug(product.getName() + "." + SlugUtil.generateRandomNumber());
        product.setSlug(slug);

        // Thumbnail
        if (productRequest.getThumbnail() != null) {
            product.setThumbnail(productRequest.getThumbnail());
        }

        // Images
        if (productRequest.getImages() != null) {
            List<Image> images = productRequest.getImages().stream()
                    .map(image -> {
                        Image newImage = new Image();
                        newImage.setUrl(image.getUrl());
                        newImage.setColor(image.getColor());
                        newImage.setProduct(product);
                        return newImage;
                    }).collect(Collectors.toList());

            product.getImages().clear();
            product.getImages().addAll(images);
        }

        // Variants
        if (productRequest.getVariants() != null) {
            List<Variant> variants = productRequest.getVariants().stream()
                    .map(variant -> {
                        Variant newVariant = new Variant();
                        newVariant.setColor(variant.getColor());
                        newVariant.setSize(variant.getSize());
                        newVariant.setQuantity(variant.getQuantity());
                        newVariant.setProduct(product);
                        return newVariant;
                    }).collect(Collectors.toList());

            product.getVariants().clear();
            product.getVariants().addAll(variants);
        }

        // Lưu một lần
        productRepository.save(product);

        return productMapper.toProductResponse(product);
    }

    public List<String> getProductStatuses() {
        return Arrays.stream(ProductStatus.values()).map(ProductStatus::getValue).collect(Collectors.toList());
    }


    public List<ProductResponse> getAllProductOnSale(){
        List<Product> products = productRepository.findAll();
        products = products.stream().filter(product -> product.getDiscountPercentage() > 0 &&
                product.getStatus() == ProductStatus.AVAILABLE).collect(Collectors.toList());
         return productMapper.toProductResponseList(products);
    }

    public List<ProductResponse> getTopFiveProducts() {
        List<TopSellingProduct> topSellingProducts = productRepository.getSaleVolume();
            return topSellingProducts.stream()
            .sorted(Comparator.comparing(TopSellingProduct::getQuantity).reversed())
            .limit(5)
            .map(product -> {
                ProductResponse productResponse = productMapper.toProductResponse(product.getProduct());
                productResponse.setSaleVolume(product.getQuantity());
                return productResponse;
            }).toList();
    }

    public Void deleteProduct(String id) {
        Product product = productRepository.findById(id).orElse(null);
        productRepository.delete(product);
        return null;
    }


}
