package com.ecommerce.controller;

import com.ecommerce.dto.Address.AddressRequest;
import com.ecommerce.dto.Address.AddressResponse;
import com.ecommerce.dto.ApiResponse;
import com.ecommerce.dto.cart.CartDetailResponse;
import com.ecommerce.dto.cart.CartRequest;
import com.ecommerce.service.AddressService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/api/address")
public class AddressController {
    final AddressService addressService;

    @PostMapping
    @PreAuthorize("hasAnyRole('ROLE_CUSTOMER')")
    public ResponseEntity<ApiResponse<AddressResponse>> addAddress(@RequestBody AddressRequest addressRequest) {
        return ResponseEntity.ok(
                ApiResponse.<AddressResponse>builder()
                        .code("Address-s-add")
                        .message("Add address ")
                        .data(addressService.addAddress(addressRequest))
                        .build()
        );
    }

    @GetMapping("/customer/{customerId}")
    @PreAuthorize("hasAnyRole('CUSTOMER')")
    public ResponseEntity<ApiResponse<List<AddressResponse>>> getCustomerAddresses(@PathVariable String customerId) {
        return ResponseEntity.ok(
                ApiResponse.<List<AddressResponse>>builder()
                        .code("Address-s-get")
                        .message("Get address ")
                        .data(addressService.getAddressesByCustomerId(customerId))
                        .build()
        );
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('CUSTOMER')")
    public ResponseEntity<ApiResponse<AddressResponse>> updateAddress(  @PathVariable String id,
                                                                              @RequestBody AddressRequest request) {
        return ResponseEntity.ok(
                ApiResponse.<AddressResponse>builder()
                        .code("Address-s-get")
                        .message("Get address ")
                        .data(addressService.updateAddress(id, request))
                        .build()
        );
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_CUSTOMER')")
    public ResponseEntity<ApiResponse<Void>> updateAddress( @PathVariable String id) {
        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .code("Address-s-get")
                        .message("Get address ")
                        .data(addressService.deleteAddress(id))
                        .build()
        );
    }
    @PutMapping("/{id}/default")
    @PreAuthorize("hasAnyRole('ROLE_CUSTOMER')")
    public ResponseEntity<ApiResponse<AddressResponse>> setDefault(  @PathVariable String id) {
        return ResponseEntity.ok(
                ApiResponse.<AddressResponse>builder()
                        .code("Address-s-set-default")
                        .message("Set default address ")
                        .data(addressService.setDefaultAddress(id))
                        .build()
        );
    }

    @GetMapping("/{customerId}/default")
    @PreAuthorize("hasAnyRole('ROLE_CUSTOMER')")
    public ResponseEntity<ApiResponse<AddressResponse>> getDefaultAddress(  @PathVariable String customerId) {
        return ResponseEntity.ok(
                ApiResponse.<AddressResponse>builder()
                        .code("Address-s-get-default")
                        .message("Get default address ")
                        .data(addressService.getDefaultAddress(customerId))
                        .build()
        );
    }
}
