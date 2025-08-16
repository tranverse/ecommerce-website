package com.ecommerce.dto.Address;

import com.ecommerce.model.Address;
import com.ecommerce.model.Customer;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
public class AddressRequest {
    private String customerName;

    private String phone;

    private Customer customer;

    private Address address;

    private Boolean isDefault;
}
