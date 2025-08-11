package com.ecommerce.repository;

import com.ecommerce.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, String> {
    Boolean existsByEmail(String email);
    Optional<Employee> findByEmail(String email);
}
