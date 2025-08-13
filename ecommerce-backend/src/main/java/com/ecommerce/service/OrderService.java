package com.ecommerce.service;

import com.ecommerce.dto.order.OrderDetailResponse;
import com.ecommerce.dto.order.OrderRequest;
import com.ecommerce.dto.order.OrderResponse;
import com.ecommerce.dto.order.OrderStatusRequest;
import com.ecommerce.enums.OrderStatus;
import com.ecommerce.enums.PaymentMethod;
import com.ecommerce.mapper.OrderMapper;
import com.ecommerce.model.Customer;
import com.ecommerce.model.Order;
import com.ecommerce.model.OrderDetail;
import com.ecommerce.repository.CustomerRepository;
import com.ecommerce.repository.OrderDetailRepository;
import com.ecommerce.repository.OrderRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.aspectj.weaver.ast.Or;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Setter
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Service
public class OrderService {
    final OrderRepository orderRepository;
    final OrderMapper orderMapper;
    final OrderDetailRepository orderDetailRepository;
    final CustomerRepository customerRepository;
    public OrderResponse addOrder(OrderRequest orderRequest) {
        Order order = orderMapper.toOrder(orderRequest);
        orderRepository.save(order);

        String dateTimePart = order.getOrderDate().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String orderCode = "ORD" + dateTimePart;
        order.setOrderCode(orderCode);

        List<OrderDetail> orderDetails = orderRequest.getProducts().stream().map(product -> {
            OrderDetail orderDetail = orderMapper.toOrderDetail(product);
            orderDetail.setOrder(order);
            return orderDetail;
        }).collect(Collectors.toList());
        orderDetailRepository.saveAll(orderDetails);


        List<OrderDetailResponse> orderDetailResponses = orderMapper.toOrderDetailResponseList(orderDetails);
        OrderResponse orderResponse = orderMapper.toOrderResponse(order);
        orderRepository.save(order);
        return orderResponse;
    }

    public List<OrderResponse> getAllOrdersByCustomer(String customerId) {
        Customer customer = customerRepository.findById(customerId).orElse(null);

        List<Order> orders = orderRepository.findByCustomer(customer);

        List<OrderResponse> orderResponses = new ArrayList<>();
        for (Order order : orders) {
            OrderResponse orderResponse = orderMapper.toOrderResponse(order);
            orderResponses.add(orderResponse);
        }
        return orderResponses;

    }

    public OrderResponse getOrderById(String id) {
        Order order = orderRepository.findById(id).orElse(null);
        return orderMapper.toOrderResponse(order);
    }

    public List<OrderResponse> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        List<OrderResponse> orderResponses = new ArrayList<>();
        for (Order order : orders) {
            OrderResponse orderResponse = orderMapper.toOrderResponse(order);
            orderResponses.add(orderResponse);
        }
        return orderResponses;
    }

    public List<String> getOrderStatus() {
        return Arrays.stream(OrderStatus.values())
                .map(OrderStatus::getValue)
                .collect(Collectors.toList());
    }

    public List<OrderResponse> upDateOrderStatus(List<OrderStatusRequest> orderStatusRequests) {
        List<OrderResponse> orderResponses = new ArrayList<>();
        for (OrderStatusRequest orderStatusRequest : orderStatusRequests) {
            Order order = orderRepository.findById(orderStatusRequest.getOrderId()).orElse(null);
            order.setStatus(OrderStatus.fromValue(orderStatusRequest.getStatus()));
            orderRepository.save(order);
            OrderResponse orderResponse = orderMapper.toOrderResponse(order);
            orderResponses.add(orderResponse);
        }
        return orderResponses;
    }

}
