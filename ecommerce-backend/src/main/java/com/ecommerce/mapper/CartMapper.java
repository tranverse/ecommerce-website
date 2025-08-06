package com.ecommerce.mapper;

import com.ecommerce.dto.cart.CartDetailResponse;
import com.ecommerce.dto.cart.CartRequest;
import com.ecommerce.model.Cart;
import com.ecommerce.model.CartDetail;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CartMapper {

    CartDetailResponse toCartDetailResponse(CartDetail cartDetail);

    Cart toCart(CartRequest cartRequest);


    List<CartDetailResponse> toCartProductsResponseList(List<CartDetail> cartDetails);
}
