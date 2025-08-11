package com.ecommerce.service;

import com.ecommerce.dto.order.OrderDetailResponse;
import com.ecommerce.dto.order.OrderRequest;
import com.ecommerce.dto.order.OrderResponse;
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
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

        List<OrderDetail> orderDetails = orderRequest.getProducts().stream().map(product -> {
            OrderDetail orderDetail = orderMapper.toOrderDetail(product);
            orderDetail.setOrder(order);
            return orderDetail;
        }).collect(Collectors.toList());

        orderDetailRepository.saveAll(orderDetails);
        List<OrderDetailResponse> orderDetailResponses = orderMapper.toOrderDetailResponseList(orderDetails);
        PaymentMethod method = orderRequest.getPaymentMethod();
        OrderResponse orderResponse = new OrderResponse();
        orderResponse.setOrderDetails(orderDetailResponses);
        orderResponse.setId(order.getId());
        orderResponse.setStatus(order.getStatus());
        orderResponse.setTotalPrice(order.getTotalPrice());
        orderResponse.setShippingAddress(order.getShippingAddress());
        orderResponse.setShippingAmount(order.getShippingAmount());
        orderResponse.setPaymentMethod(method);
        orderRepository.save(order);

        return orderResponse;
    }

    public List<OrderResponse> getAllOrdersByCustomer(String customerId) {
        Customer customer = customerRepository.findById(customerId).orElse(null);

        List<Order> orders = orderRepository.findByCustomer(customer);

        List<OrderResponse> orderResponses = new ArrayList<>();
        for (Order order : orders) {
            List<OrderDetailResponse> orderDetailResponses = orderMapper.toOrderDetailResponseList(order.getOrderDetails());
            System.out.println(order.getOrderDetails().size());
            OrderResponse orderResponse = new OrderResponse();
            orderResponse.setId(order.getId());
            orderResponse.setStatus(order.getStatus());
            orderResponse.setTotalPrice(order.getTotalPrice());
            orderResponse.setShippingAddress(order.getShippingAddress());
            orderResponse.setOrderDetails(orderDetailResponses);
            orderResponse.setShippingAmount(order.getShippingAmount());
            orderResponse.setPaymentMethod(order.getPaymentMethod());
            orderResponse.setOrderDate(order.getOrderDate());
            orderResponse.setStatus(order.getStatus());
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
}
