package com.app.majix.controller;

import com.app.majix.dto.CartDTO;
import com.app.majix.dto.CartItemResponseDTO;
import com.app.majix.entity.Cart;
import com.app.majix.entity.CartItem;
import com.app.majix.mapper.UserMapper;
import com.app.majix.repository.CartItemRepository;
import com.app.majix.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {
    private final CartService cartService;
    private final CartItemRepository cartItemRepository;

    public CartController(CartService cartService, CartItemRepository cartItemRepository){
        this.cartService = cartService;
        this.cartItemRepository = cartItemRepository;
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

    @GetMapping("/{customerId}")
    public CartDTO getCartByCustomerId(@PathVariable Long customerId) {
        return cartService.getCartByCustomerId(customerId);
    }

    @DeleteMapping("/item/{id}")
    public ResponseEntity<String> removeCartItem(@PathVariable Long id) {
        cartService.removeCartItem(id);
        return ResponseEntity.ok("Cart item removed successfully");
    }


}
