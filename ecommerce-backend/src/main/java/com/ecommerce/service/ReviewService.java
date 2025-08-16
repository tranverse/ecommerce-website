package com.ecommerce.service;

import com.ecommerce.dto.Review.ReviewRequest;
import com.ecommerce.dto.Review.ReviewResponse;
import com.ecommerce.model.Customer;
import com.ecommerce.model.Order;
import com.ecommerce.model.Product;
import com.ecommerce.model.Review;
import com.ecommerce.repository.CustomerRepository;
import com.ecommerce.repository.OrderRepository;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.repository.ReviewRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReviewService {
    final ReviewRepository reviewRepository;
    final ProductRepository productRepository;
    final CustomerRepository customerRepository;
    final OrderRepository orderRepository;
    public List<ReviewResponse> getReviewOfProduct(String productId) {
        List<Review> reviews = reviewRepository.findByProductId(productId);
        List<ReviewResponse> reviewResponses = new ArrayList<>();
        for (Review review : reviews) {
            ReviewResponse reviewResponse = new ReviewResponse();
            reviewResponse.setComment(review.getComment());
            reviewResponse.setCustomer(review.getCustomer());
            reviewResponse.setRating(review.getRating());
            reviewResponse.setCreatedAt(review.getCreatedAt());
            reviewResponses.add(reviewResponse);
        }
        return reviewResponses;
    }

    public List<ReviewResponse> addReview(List<ReviewRequest> reviewRequests) {
        List<ReviewResponse> responseList = new ArrayList<>();

        for (ReviewRequest request : reviewRequests) {
            Review review = new Review();

            Customer customer = customerRepository.findById(request.getCustomer().getId()).orElse(null);
            Product product = productRepository.findById(request.getProduct().getId()).orElse(null);
            Order order = orderRepository.findById(request.getOrderId()).orElse(null);

            review.setComment(request.getComment());
            review.setRating(request.getRating());
            review.setCustomer(customer);
            review.setProduct(product);
            review.setOrder(order);
            reviewRepository.save(review);

            ReviewResponse res = new ReviewResponse();
            res.setComment(review.getComment());
            res.setRating(review.getRating());
            res.setCustomer(customer);
            res.setProduct(product);
            res.setCreatedAt(review.getCreatedAt());
            responseList.add(res);
        }

        return responseList;
    }
}
