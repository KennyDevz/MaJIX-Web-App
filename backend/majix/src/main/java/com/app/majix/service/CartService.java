package com.app.majix.service;

import com.app.majix.dto.CartDTO;
import com.app.majix.dto.CartItemResponseDTO;
import com.app.majix.entity.Cart;
import com.app.majix.entity.CartItem;
import com.app.majix.entity.Customer;
import com.app.majix.entity.ProductVariant;
import com.app.majix.mapper.UserMapper;
import com.app.majix.repository.CartItemRepository;
import com.app.majix.repository.CartRepository;
import com.app.majix.repository.CustomerRepository;
import com.app.majix.repository.ProductVariantRepository;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartService {
    private final CustomerRepository customerRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductVariantRepository productVariantRepository;
    private final UserMapper userMapper;

    // ✅ Constructor injection WITHOUT @Autowired
    public CartService(CustomerRepository customerRepository,CartRepository cartRepository, CartItemRepository cartItemRepository,
                       ProductVariantRepository productVariantRepository, UserMapper userMapper) {
        this.customerRepository = customerRepository;
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productVariantRepository = productVariantRepository;
        this.userMapper = userMapper;
    }

    public Cart getActiveCart(Long customerId) {
        // Try to find a cart with status "ACTIVE"
        return cartRepository.findByCustomerUserIdAndStatus(customerId, "ACTIVE")
                .orElseGet(() -> {
                    // If NO active cart exists, create a new one!
                    Customer customer = customerRepository.findById(customerId)
                            .orElseThrow(() -> new RuntimeException("Customer not found"));
                    Cart newCart = new Cart(customer); // Constructor sets status to ACTIVE
                    return cartRepository.save(newCart);
                });
    }

    @Transactional
    public Cart addToCart(Long customerId, Long variantId, int qty) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        ProductVariant variant = productVariantRepository.findById(variantId)
                .orElseThrow(() -> new RuntimeException("Product Variant not found"));

        if (qty > variant.getQuantityInStock()) {
            throw new RuntimeException("Requested quantity exceeds stock available");
        }

        Cart cart = getActiveCart(customerId);

        // Check if variant already exists in cart
        Optional<CartItem> existingItem = cart.getCartItems().stream()
                .filter(item -> item.getProductVariant().getVariantId().equals(variantId))
                .findFirst();

        int totalQty = qty;
        if (existingItem.isPresent()) {
            totalQty += existingItem.get().getQty(); // sum existing quantity
        }

        if (totalQty > variant.getQuantityInStock()) {
            throw new RuntimeException("Requested quantity exceeds stock available. Stock left: "
                    + variant.getQuantityInStock());
        }
        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQty(item.getQty() + qty); // increase quantity
        } else {
            CartItem newItem = new CartItem(cart, variant, qty);
            cart.addCartItem(newItem);
        }

        cart.calculateTotalAmount(); // update total amount
        cartRepository.save(cart); // save cart and cart items
        return cart;
    }

    public List<CartItemResponseDTO> getCartItemsByCustomerId(Long customerId) {
        // --- 3. CHANGE: Get items from the ACTIVE cart only ---
        Cart cart = getActiveCart(customerId);

        return cart.getCartItems().stream()
                .map(userMapper::toCartItemResponseDTO)
                .collect(Collectors.toList());
    }

    public CartDTO getCartByCustomerId(Long customerId){
        // --- 4. CHANGE: Get the ACTIVE cart ---
        Cart customerCart = getActiveCart(customerId);

        customerCart.calculateTotalAmount();
        return userMapper.toCartDTO(customerCart);
    }

    public void removeCartItem(Long cartItemId) {
        // Fetch the cart item, throw if not found
        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("CartItem not found"));

        // Remove the item from the cart
        Cart cart = item.getCart();
        if (cart != null) {
            cart.removeCartItem(item);
            cartRepository.save(cart); // persist the change
        }

        // Delete the cart item itself
        cartItemRepository.delete(item);
    }

    // --- 5. NEW METHOD: For Checkout ---
    public void closeCart(Long cartId) {
        Cart cart = cartRepository.findById(cartId).orElse(null);
        if (cart != null) {
            cart.setStatus("CLOSED");
            cartRepository.save(cart);
        }
    }


}
