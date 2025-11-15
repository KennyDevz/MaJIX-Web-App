package com.app.majix.controller;

import com.app.majix.dto.ReviewDTO;
import com.app.majix.entity.Review;
import com.app.majix.service.ReviewService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    public Review createReview(@RequestBody ReviewDTO reviewDTO) {
        return reviewService.createReview(reviewDTO);
    }


}