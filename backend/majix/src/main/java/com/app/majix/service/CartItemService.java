package com.app.majix.service;

import com.app.majix.entity.CartItem;
import com.app.majix.exception.OutOfStockException;
import com.app.majix.repository.CartItemRepository;
import com.app.majix.repository.CartRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class CartItemService {
    private final CartItemRepository cartItemRepository;

    public CartItemService(CartItemRepository cartItemRepository){
        this.cartItemRepository = cartItemRepository;
    }
    public CartItem updateQuantity(Long cartItemId, int change) {
        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        int stock = item.getProductVariant().getQuantityInStock();
        int newQty = item.getQty() + change;

        if (newQty > stock) {
            throw new OutOfStockException("Not enough stock");
        }

        if (newQty < 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Quantity cannot go below 1");
        }

        item.setQty(newQty);
        return cartItemRepository.save(item);
    }

    public CartItem increment(Long id) {
        return updateQuantity(id, +1);
    }

    public CartItem decrement(Long id) {
        return updateQuantity(id, -1);
    }
}
