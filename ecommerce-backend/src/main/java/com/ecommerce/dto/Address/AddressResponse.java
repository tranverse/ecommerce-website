package com.ecommerce.dto.Address;

import com.ecommerce.model.Address;
import com.ecommerce.model.Customer;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class AddressResponse {
    private String id;

    private String customerName;

    private String phone;

    private Boolean isDefault;

    private Address address;
}
