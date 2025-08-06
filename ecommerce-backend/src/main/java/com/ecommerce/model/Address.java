package com.ecommerce.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String customerName;

    private String phone;

    private String province;

    private String district;

    private String ward;

    private String details;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
}
