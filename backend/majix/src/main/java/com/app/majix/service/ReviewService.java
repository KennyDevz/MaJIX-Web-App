package com.app.majix.service;

import com.app.majix.dto.ReviewDTO;
import com.app.majix.entity.Customer;
import com.app.majix.entity.Product;
import com.app.majix.entity.Review;
import com.app.majix.exception.ProductNotFoundException;
import com.app.majix.repository.CustomerRepository;
import com.app.majix.repository.ProductRepository;
import com.app.majix.repository.ReviewRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final CustomerRepository customerRepository; // For the "Customer Only" rule

    public ReviewService(ReviewRepository reviewRepository,
                         ProductRepository productRepository,
                         CustomerRepository customerRepository) {
        this.reviewRepository = reviewRepository;
        this.productRepository = productRepository;
        this.customerRepository = customerRepository;
    }

    public Review createReview(ReviewDTO reviewDTO) {
        Product product = productRepository.findById(reviewDTO.getProductId())
                .orElseThrow(() -> new ProductNotFoundException("Product not found"));

        // This is the "Customer Only" rule
        Customer customer = customerRepository.findById(reviewDTO.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found. Only customers can post reviews."));

        Review review = new Review();
        review.setProduct(product);
        review.setCustomer(customer);
        review.setRating(reviewDTO.getRating());
        review.setComment(reviewDTO.getComment());
        review.setDatePosted(LocalDateTime.now());

        return reviewRepository.save(review);
    }
}