package com.ecommerce.repository;

import com.ecommerce.dto.product.TopSellingProduct;
import com.ecommerce.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface ProductRepository extends JpaRepository<Product, String> {
    @Query("SELECT new com.ecommerce.dto.product.TopSellingProduct(p, CAST(COALESCE(SUM(od.quantity), 0) AS LONG)) " +
            "FROM Product p LEFT JOIN OrderDetail od ON p.id = od.product.id " +
            "GROUP BY p ORDER BY COALESCE(SUM(od.quantity),0)  ")
    List<TopSellingProduct> getSaleVolume();




}
