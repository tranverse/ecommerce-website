package com.ecommerce.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CustomerAddress {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String customerName;

    private String phone;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    private Boolean isDefault;

    @OneToOne
    @JoinColumn(name = "address_id")
    private Address address;
}
