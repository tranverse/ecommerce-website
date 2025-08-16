package com.ecommerce.repository;

import com.ecommerce.model.CustomerAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface CustomerAddressRepository extends JpaRepository<CustomerAddress, String> {
    @Transactional
    @Modifying
    @Query("UPDATE CustomerAddress ca SET ca.isDefault = false WHERE ca.customer.id = :customerId")
    void updateIsDefaultForCustomer(@Param("customerId") String customerId);

    List<CustomerAddress> findByCustomerId(String customerId);

   Optional<CustomerAddress> findByCustomerIdAndIsDefault(String customerId, Boolean isDefault);

   Boolean existsByCustomerId(String customerId);
}
