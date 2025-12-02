package com.app.majix.controller;

import com.app.majix.service.CartItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart-item")
@CrossOrigin(origins = "http://localhost:3000")

public class CartItemController {
    private final CartItemService cartItemService;

    public CartItemController(CartItemService cartItemService){
        this.cartItemService = cartItemService;
    }

    @PutMapping("/{id}/increment")
    public ResponseEntity<?> increment(@PathVariable Long id) {
        return ResponseEntity.ok(cartItemService.increment(id));
    }

    @PutMapping("/{id}/decrement")
    public ResponseEntity<?> decrement(@PathVariable Long id) {
        return ResponseEntity.ok(cartItemService.decrement(id));
    }
}
