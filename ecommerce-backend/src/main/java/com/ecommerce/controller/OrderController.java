package com.ecommerce.controller;

import com.ecommerce.dto.ApiResponse;
import com.ecommerce.dto.order.OrderRequest;
import com.ecommerce.dto.order.OrderResponse;
import com.ecommerce.model.Order;
import com.ecommerce.service.OrderService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.aspectj.weaver.ast.Or;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
@RequiredArgsConstructor
public class OrderController {
    final OrderService orderService;
    @PostMapping
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
}
