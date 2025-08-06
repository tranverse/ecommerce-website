package com.ecommerce.repository;

import com.ecommerce.model.Cart;
import com.ecommerce.model.CartDetail;
import com.ecommerce.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartDetailRepository extends JpaRepository<CartDetail, String> {
    Optional<CartDetail> findByCartAndProduct(Cart cart, Product product);

    List<CartDetail> findByCart(Cart cart);
}
