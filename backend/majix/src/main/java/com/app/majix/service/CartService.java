package com.app.majix.service;

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

import java.util.List;
import java.util.Optional;

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

    //creates cart for every customer registration
    public Cart createCustomerCart(Customer customer){
        Cart cart = new Cart();
        cart.setCustomer(customer);//sets cart->user attr
        customer.setCart(cart);//sets user->cart attr
        return cartRepository.save(cart);
    }


    public Cart addToCart(Long customerId, Long variantId, int qty) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        ProductVariant variant = productVariantRepository.findById(variantId)
                .orElseThrow(() -> new RuntimeException("Product Variant not found"));

        if (qty > variant.getQuantityInStock()) {
            throw new RuntimeException("Requested quantity exceeds stock available");
        }

        Cart cart = customer.getCart();

        // Check if variant already exists in cart
        Optional<CartItem> existingItem = cart.getCartItems().stream()
                .filter(item -> item.getProductVariant().getVariantId().equals(variantId))
                .findFirst();

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
        List<CartItem> items = cartItemRepository.findByCartCustomerUserId(customerId);

        return items.stream()
                .map(userMapper::toCartItemResponseDTO)
                .toList();
    }
}
