package com.ecommerce.service;

import com.ecommerce.dto.Statistic.StatisticResponse;
import com.ecommerce.repository.CustomerRepository;
import com.ecommerce.repository.OrderRepository;
import com.ecommerce.repository.ProductRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class StatisticService {

     final ProductRepository productRepository;
     final OrderRepository orderRepository;
     final CustomerRepository customerRepository;

    public StatisticResponse getDashboardStats() {
        StatisticResponse response = new StatisticResponse();
        response.setTotalProducts(productRepository.countAllProducts());
        response.setTotalOrders(orderRepository.countAllOrders());
        response.setTotalCustomers(customerRepository.countAllCustomers());
        response.setRevenue(orderRepository.totalRevenue() != null ? orderRepository.totalRevenue() : 0.0);

        return response;
    }
}
