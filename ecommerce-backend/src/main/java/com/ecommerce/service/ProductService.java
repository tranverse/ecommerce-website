package com.ecommerce.service;

import com.ecommerce.dto.product.ProductRequest;
import com.ecommerce.dto.product.ProductResponse;
import com.ecommerce.dto.product.TopSellingProduct;
import com.ecommerce.enums.ProductStatus;
import com.ecommerce.exception.AppException;
import com.ecommerce.mapper.ProductMapper;
import com.ecommerce.model.Image;
import com.ecommerce.model.Product;
import com.ecommerce.model.Review;
import com.ecommerce.model.Variant;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.repository.ReviewRepository;
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
    final ReviewRepository reviewRepository;
    public Float calculateRating(Product product) {
        List<Review> reviews = reviewRepository.findByProductId(product.getId());
        if (reviews.isEmpty()) {
            return 0f;
        }

        float rating = 0f;
        for (Review review : reviews) {
            rating += review.getRating();
        }
        return rating / reviews.size();
    }

    public List<ProductResponse> getAllProducts() {
        List<TopSellingProduct> topSellingProducts = productRepository.getSaleVolume();
        return topSellingProducts.stream().map(
                product -> {
                    ProductResponse productResponse = productMapper.toProductResponse(product.getProduct());
                    productResponse.setSaleVolume(product.getQuantity());
                    productResponse.setRating(calculateRating(product.getProduct()));
                    return productResponse;
                }
        ).toList();
    }

    public ProductResponse getProduct(String id) {
        Product product = productRepository.findById(id).orElse(null);
        ProductResponse productResponse = productMapper.toProductResponse(product);
        productResponse.setRating(calculateRating(product));
        return productResponse;
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

        product.setName(productRequest.getName());
        product.setDescription(productRequest.getDescription());
        product.setPrice(productRequest.getPrice());
        product.setDiscountPercentage(productRequest.getDiscountPercentage());
        product.setOrigin(productRequest.getOrigin());
        product.setStatus(productRequest.getStatus());
        product.setCategory(productRequest.getCategory());
        String slug = SlugUtil.toSlug(product.getName() + "." + SlugUtil.generateRandomNumber());
        product.setSlug(slug);

        if (productRequest.getThumbnail() != null) {
            product.setThumbnail(productRequest.getThumbnail());
        }

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

        for (Variant v : product.getVariants()) {
            v.setStatus(false); // đánh dấu hết hàng
        }

        for (ProductRequest.VariantDTO vr : productRequest.getVariants()) {
            Variant exist = product.getVariants().stream()
                    .filter(v -> v.getColor().equals(vr.getColor()) && v.getSize().equals(vr.getSize()))
                    .findFirst()
                    .orElse(null);

            if (exist != null) {
                exist.setQuantity(vr.getQuantity());
                exist.setStatus(true);
            } else {
                Variant newVariant = new Variant();
                newVariant.setColor(vr.getColor());
                newVariant.setSize(vr.getSize());
                newVariant.setQuantity(vr.getQuantity());
                newVariant.setStatus(true);
                newVariant.setProduct(product);
                product.getVariants().add(newVariant);
            }
        }


        productRepository.save(product);

        return productMapper.toProductResponse(product);
    }

    public List<String> getProductStatuses() {
        return Arrays.stream(ProductStatus.values()).map(ProductStatus::getValue).collect(Collectors.toList());
    }

    public List<ProductResponse> getAllProductOnSale() {
        return productRepository.findAll().stream()
                .filter(p -> p.getDiscountPercentage() > 0 && p.getStatus() == ProductStatus.AVAILABLE)
                .map(p -> {
                    ProductResponse res = productMapper.toProductResponse(p);
                    res.setRating(calculateRating(p));
                    return res;
                })
                .collect(Collectors.toList());
    }


    public List<ProductResponse> getTopFiveProducts() {
        List<TopSellingProduct> topSellingProducts = productRepository.getSaleVolume();
            return topSellingProducts.stream()
            .sorted(Comparator.comparing(TopSellingProduct::getQuantity).reversed())
            .limit(5)
            .map(product -> {
                ProductResponse productResponse = productMapper.toProductResponse(product.getProduct());
                productResponse.setSaleVolume(product.getQuantity());
                productResponse.setRating(calculateRating(product.getProduct()));
                return productResponse;
            }).toList();
    }

    public Void deleteProduct(String id) {
        Product product = productRepository.findById(id).orElse(null);
        productRepository.delete(product);
        return null;
    }

    
}
