package com.ecommerce.repository;

import com.ecommerce.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, String> {
    List<Review> findByProductId(String productId);
}
