package com.ecommerce.dto.Statistic;

import lombok.Data;

@Data
public class StatisticResponse {
    private Long totalProducts;
    private Long totalOrders;
    private Long totalCustomers;
    private Double revenue;
}
