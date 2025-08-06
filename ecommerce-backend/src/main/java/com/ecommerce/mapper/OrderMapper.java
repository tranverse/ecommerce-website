package com.ecommerce.mapper;

import com.ecommerce.dto.order.OrderDetailResponse;
import com.ecommerce.dto.order.OrderRequest;
import com.ecommerce.dto.order.OrderResponse;
import com.ecommerce.model.Order;
import com.ecommerce.model.OrderDetail;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    Order toOrder(OrderRequest orderRequest);

    OrderDetailResponse toOrderDetailResponse(OrderDetail orderDetail);

    OrderDetail toOrderDetail(OrderRequest.ProductOrderDTO productOrderDTO);

    List<OrderDetailResponse> toOrderDetailResponseList(List<OrderDetail> orderDetails);

    @Mapping(source = "order.orderDetails", target = "orderDetails")
    OrderResponse toOrderResponse(Order order);

}
