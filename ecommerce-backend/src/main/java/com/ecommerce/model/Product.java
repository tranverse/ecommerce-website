package com.ecommerce.model;

import com.ecommerce.enums.ProductStatus;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;

    private String description;

    private BigDecimal price;

    private Double discountPercentage;

    private String origin;

    private LocalDateTime createAt;

    private LocalDateTime updateAt;

    @Enumerated(EnumType.STRING)
    private ProductStatus status;

    private Float rating;

    private String thumbnail;

    private String slug;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    @JsonBackReference(value = "image-product")
    private List<Image> images = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    @JsonManagedReference
    private List<Variant> variants = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    @JsonBackReference(value = "reviews-product")
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    @JsonBackReference(value = "cartDetail-product")
    private List<CartDetail> cartDetails = new ArrayList<>();


    @PrePersist
    protected void onCreate() {
        this.createAt = LocalDateTime.now();
    }
}
