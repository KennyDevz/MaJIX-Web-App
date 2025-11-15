package com.app.majix.mapper;

import com.app.majix.dto.AdminDTO;
import com.app.majix.dto.CartDTO;
import com.app.majix.dto.CustomerDTO;
import com.app.majix.dto.UserDTO;
import com.app.majix.entity.Admin;
import com.app.majix.entity.Cart;
import com.app.majix.entity.Customer;
import com.app.majix.entity.User;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserMapper {
    public CustomerDTO toCustomerDTO(Customer customer) {
        if(customer == null) return null;
        CartDTO cartDTO = null;
        if (customer.getCart() != null) {
            cartDTO = new CartDTO(
                    customer.getCart().getCartId(), // use the actual cart ID
                    List.of() // empty list, since no cart items yet
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
}
