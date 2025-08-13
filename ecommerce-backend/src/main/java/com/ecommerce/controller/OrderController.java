package com.ecommerce.controller;

import com.ecommerce.dto.ApiResponse;
import com.ecommerce.dto.order.OrderRequest;
import com.ecommerce.dto.order.OrderResponse;
import com.ecommerce.dto.order.OrderStatusRequest;
import com.ecommerce.model.Order;
import com.ecommerce.service.OrderService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.aspectj.weaver.ast.Or;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
@RequiredArgsConstructor
public class OrderController {
    final OrderService orderService;
    @PostMapping
    @PreAuthorize("hasAnyRole('CUSTOMER')")
    public ResponseEntity<ApiResponse<OrderResponse>> addOrder(@RequestBody OrderRequest orderRequest) {
        return ResponseEntity.ok(
                ApiResponse.<OrderResponse>builder()
                        .success(true)
                        .message("Add order successfully")
                        .code("Order-s-add")
                        .data(orderService.addOrder(orderRequest))
                        .build()
        );
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<ApiResponse<List<OrderResponse>>> getAllOrderByCustomer(@PathVariable String customerId) {
        return ResponseEntity.ok(
                ApiResponse.<List<OrderResponse>>builder()
                        .message("Add order successfully")
                        .code("Order-s-get")
                        .data(orderService.getAllOrdersByCustomer(customerId))
                        .build()
        );
    }
    @GetMapping("/detail/{orderId}")
    public ResponseEntity<ApiResponse<OrderResponse>> getOrderDetail(@PathVariable String orderId) {
        return ResponseEntity.ok(
                ApiResponse.<OrderResponse>builder()
                        .message("Get order detail successfully")
                        .code("Order-s-get-detail")
                        .data(orderService.getOrderById(orderId))
                        .build()
        );
    }
    @GetMapping("/get-all")
    public ResponseEntity<ApiResponse<List<OrderResponse>>> getOrderDetail() {
        return ResponseEntity.ok(
                ApiResponse.<List<OrderResponse>>builder()
                        .message("Get all order successfully")
                        .code("Order-s-get-all")
                        .data(orderService.getAllOrders())
                        .build()
        );
    }
    @GetMapping("/status")
    public ResponseEntity<ApiResponse<List<String>>> getOrderStatus() {
        return ResponseEntity.ok(
                ApiResponse.<List<String>>builder()
                        .message("Get order status successfully")
                        .code("Order-s-get-order-status")
                        .data(orderService.getOrderStatus())
                        .build()
        );
    }
    @PutMapping("/update-order-status")
    public ResponseEntity<ApiResponse<List<OrderResponse>>> getOrderStatus(@RequestBody List<OrderStatusRequest> orderStatusRequests) {
        return ResponseEntity.ok(
                ApiResponse.<List<OrderResponse>>builder()
                        .message("Update order status successfully")
                        .code("Order-s-update-order-status")
                        .data(orderService.upDateOrderStatus(orderStatusRequests))
                        .build()
        );
    }

}
