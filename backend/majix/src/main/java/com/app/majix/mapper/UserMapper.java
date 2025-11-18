package com.app.majix.mapper;

import com.app.majix.dto.*;
import com.app.majix.entity.*;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserMapper {
    public CustomerDTO toCustomerDTO(Customer customer) {
        if(customer == null) return null;
        CartDTO cartDTO = null;


        if (customer.getCart() != null) {
            Cart cart = customer.getCart();
            // Force lazy load
            cart.getCartItems().size();

            List<CartItemDTO> cartItemDTOs = cart.getCartItems().stream()
                    .map(item -> new CartItemDTO(
                            item.getCartItemId(),
                            item.getProductVariant() != null ? item.getProductVariant().getVariantId() : null,
                            item.getQty(),
                            item.getSubtotal()
                    ))
                    .toList();

            cartDTO = new CartDTO(
                    cart.getCartId(),
                    cartItemDTOs
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

        List<CartItemDTO> items = cart.getCartItems().stream()
                .map(item -> new CartItemDTO(
                        item.getCartItemId(),
                        item.getProductVariant().getVariantId(), // just the variantId from your entity
                        item.getQty(),
                        item.getSubtotal()
                ))
                .collect(Collectors.toList());

        return new CartDTO(cart.getCartId(), items);
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

                cartItem.getSubtotal(),

                // Quantity
                cartItem.getQty()
        );
    }
}
