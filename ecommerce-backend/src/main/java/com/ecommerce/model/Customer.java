package com.ecommerce.model;

import com.ecommerce.enums.CustomerTire;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;

    @Column(unique = true)
    private String email;

    private String phone;

    private String password;

    @Enumerated(EnumType.STRING)
    private CustomerTire tire;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<CustomerAddress> customerAddresses = new ArrayList<>();

    @OneToMany(mappedBy = "customer")
    @JsonIgnore
    private List<Order> orders = new ArrayList<>();

    @OneToMany(mappedBy = "customer")
    @JsonIgnore
    private List<Review> reviews = new ArrayList<>();

    @OneToOne(mappedBy = "customer")
    @JsonIgnore
    private Cart cart;


}
