package com.ecommerce.service;

import com.ecommerce.dto.ApiResponse;
import com.ecommerce.dto.cart.CartDetailResponse;
import com.ecommerce.dto.cart.CartRequest;
import com.ecommerce.dto.cart.QuantityRequest;
import com.ecommerce.mapper.CartMapper;
import com.ecommerce.model.Cart;
import com.ecommerce.model.CartDetail;
import com.ecommerce.model.Product;
import com.ecommerce.repository.CartDetailRepository;
import com.ecommerce.repository.CartRepository;
import com.ecommerce.repository.CustomerRepository;
import com.ecommerce.repository.ProductRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CartService {
    final CartRepository cartRepository;
    final CartDetailRepository cartDetailRepository;
    final CartMapper cartMapper;
    final CustomerRepository customerRepository;
    final ProductRepository productRepository;
    public CartDetailResponse addProductToCart(CartRequest cartRequest) {
        Cart cart = cartRepository.findByCustomerId(cartRequest.getCustomer().getId());
        if(cart == null) {
            cart = cartMapper.toCart(cartRequest);
            cartRepository.save(cart);

            CartDetail cartDetail = new CartDetail();
            cartDetail.setCart(cart);
            cartDetail.setQuantity(cartRequest.getQuantity());
            cartDetail.setProduct(cartRequest.getProduct());
            cartDetail.setVariant(cartRequest.getVariant());
            cartDetail = cartDetailRepository.save(cartDetail);
            return cartMapper.toCartDetailResponse(cartDetail);

        }else {
            Optional<CartDetail> optCartDetail = cartDetailRepository.findByCartAndProduct(cart, cartRequest.getProduct());
            CartDetail cartDetail;
            if(optCartDetail.isPresent()) {
                cartDetail = optCartDetail.get();
                cartDetail.setQuantity(cartRequest.getQuantity() + cartDetail.getQuantity());
            }else {
                cartDetail = new CartDetail();
                cartDetail.setCart(cart);
                cartDetail.setProduct(cartRequest.getProduct());
                cartDetail.setQuantity(cartRequest.getQuantity());
                cartDetail.setVariant(cartRequest.getVariant());
            }
            cartDetail = cartDetailRepository.save(cartDetail);
            return cartMapper.toCartDetailResponse(cartDetail);
        }
    }

    public List<CartDetailResponse> getAllCartDetails() {

        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();

        Cart cart = cartRepository.findByCustomerEmail(email);

        List<CartDetail> cartDetails = cartDetailRepository.findByCart(cart);

        return cartMapper.toCartProductsResponseList(cartDetails);
    }

    public Object updateQuantity(QuantityRequest quantityRequest) {
        Cart cart = cartRepository.findByCustomerId(quantityRequest.customerId);
        Product product = productRepository.findById(quantityRequest.productId).orElse(null);
        CartDetail cartDetail = cartDetailRepository.findByCartAndProduct(cart, product).orElse(null);
        cartDetail.setQuantity(quantityRequest.quantity);
        cartDetailRepository.save(cartDetail);
        return Map.of(
                "productId", product.getId(),
                "quantity", cartDetail.getQuantity()
        );
    }

    public String deleteProductFromCart(String productId, String customerId) {
        Cart cart = cartRepository.findByCustomerId(customerId);
        Product product = productRepository.findById(productId).orElse(null);
        CartDetail cartDetail = cartDetailRepository.findByCartAndProduct(cart, product).orElse(null);
        cartDetailRepository.delete(cartDetail);
        return productId;
    }
}
