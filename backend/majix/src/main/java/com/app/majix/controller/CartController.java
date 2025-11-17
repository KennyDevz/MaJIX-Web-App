package com.app.majix.controller;

import com.app.majix.entity.Cart;
import com.app.majix.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {
    private final CartService cartService;

    public CartController(CartService cartService){
        this.cartService = cartService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestParam Long customerId,
                                       @RequestParam Long variantId,
                                       @RequestParam int qty) {
        try {
            Cart cart = cartService.addToCart(customerId, variantId, qty);
            return ResponseEntity.ok(cart);
        } catch (RuntimeException e) {
            // Return the real error message in JSON
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }


}
