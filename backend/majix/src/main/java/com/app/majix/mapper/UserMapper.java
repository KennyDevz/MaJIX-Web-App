package com.app.majix.mapper;

import com.app.majix.dto.*;
import com.app.majix.entity.*;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserMapper {

    // --- ADD THIS NEW METHOD HERE ---
    // This method figures out exactly which specific DTO to create
    public UserDTO toDTO(User user) {
        if (user == null) {
            return null;
        }

        if (user instanceof Customer customer) {
            return toCustomerDTO(customer); // Calls your existing method
        } else if (user instanceof Admin admin) {
            return toAdminDTO(admin);       // Calls your existing method
        } else {
            return toUserDTO(user);         // Calls your existing method for generic users
        }
    }

    public CustomerDTO toCustomerDTO(Customer customer) {
        if(customer == null) return null;
        CartDTO cartDTO = null;

//        if (customer.getCart() != null) {
//            Cart cart = customer.getCart();
//            // Force lazy load
//            cart.getCartItems().size();
//
//            List<CartItemResponseDTO> cartItemResponseDto = cart.getCartItems().stream()
//                    .map(item -> new CartItemResponseDTO(
//                            item.getCartItemId(),
//                            item.getProductVariant().getProduct().getProductId(),
//                            item.getProductVariant().getVariantId(),
//                            item.getProductVariant().getProduct().getName(),
//                            item.getProductVariant().getProduct().getImageUrl(),
//                            item.getProductVariant().getSize(),
//                            item.getProductVariant().getColor(),
//                            item.getSubtotal(),
//                            item.getQty()
//                    ))
//                    .toList();
//
//            cartDTO = new CartDTO(
//                    cart.getCartId(),
//                    cartItemResponseDto,
//                    cart.getTotalAmount()
//            );
//        }

        // 1. Find the single ACTIVE cart from the list of carts
        Cart activeCart = null;
        if (customer.getCarts() != null) {
            activeCart = customer.getCarts().stream()
                    .filter(c -> "ACTIVE".equals(c.getStatus()))
                    .findFirst()
                    .orElse(null);
        }
        // 2. If an active cart exists, map it to DTO
        if (activeCart != null) {
            List<CartItemResponseDTO> cartItemResponseDto = activeCart.getCartItems().stream()
                    .map(item -> new CartItemResponseDTO(
                            item.getCartItemId(),
                            item.getProductVariant().getProduct().getProductId(),
                            item.getProductVariant().getVariantId(),
                            item.getProductVariant().getProduct().getName(),
                            item.getProductVariant().getProduct().getImageUrl(),
                            item.getProductVariant().getSize(),
                            item.getProductVariant().getColor(),
                            item.getProductVariant().getPrice(),
                            item.getSubtotal(),
                            item.getQty()
                    ))
                    .toList();

            cartDTO = new CartDTO(
                    activeCart.getCartId(),
                    cartItemResponseDto,
                    activeCart.getTotalAmount()
            );
        }

        return new CustomerDTO(
                customer.getUserId(),
                customer.getRole(),
                customer.getFirstname(),
                customer.getLastname(),
                customer.getEmail(),
                customer.getPhonenumber(),
                cartDTO

        );
    }

    public AdminDTO toAdminDTO(Admin admin) {
        if(admin == null) return null;
        return new AdminDTO(
                admin.getUserId(),
                admin.getRole(),
                admin.getFirstname(),
                admin.getLastname(),
                admin.getEmail()
        );
    }

    public UserDTO toUserDTO(User user) {
        if(user == null) return null;
        return new UserDTO(
                user.getUserId(),
                user.getRole(),
                user.getFirstname(),
                user.getLastname(),
                user.getEmail()
        );
    }

    public CartDTO toCartDTO(Cart cart) {
        if (cart == null) return null;

        //Orginally list of CartItemDTO but modified to CartItemResponseDTO for frontend
        List<CartItemResponseDTO> items = cart.getCartItems().stream()
                .map(item -> new CartItemResponseDTO(
                        item.getCartItemId(),
                        item.getProductVariant().getProduct().getProductId(),
                        item.getProductVariant().getVariantId(),
                        item.getProductVariant().getProduct().getName(),
                        item.getProductVariant().getImageUrl(),
                        item.getProductVariant().getSize(),
                        item.getProductVariant().getColor(),
                        item.getProductVariant().getPrice(),
                        item.getSubtotal(),
                        item.getQty()
                ))
                .collect(Collectors.toList());

        return new CartDTO(cart.getCartId(), items, cart.getTotalAmount());
    }

    public CartItemResponseDTO toCartItemResponseDTO(CartItem cartItem) {
        return new CartItemResponseDTO(
                cartItem.getCartItemId(),
                cartItem.getProductVariant().getProduct().getProductId(),
                cartItem.getProductVariant().getVariantId(),

                // Product fields
                cartItem.getProductVariant().getProduct().getName(),
                cartItem.getProductVariant().getImageUrl(),

                // Variant fields
                cartItem.getProductVariant().getSize(),
                cartItem.getProductVariant().getColor(),

                cartItem.getProductVariant().getPrice(),

                cartItem.getSubtotal(),

                // Quantity
                cartItem.getQty()
        );
    }
}
