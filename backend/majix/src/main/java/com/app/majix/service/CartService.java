package com.app.majix.service;

import com.app.majix.entity.Cart;
import com.app.majix.entity.Customer;
import com.app.majix.entity.User;
import com.app.majix.repository.CartRepository;
import org.springframework.stereotype.Service;

@Service
public class CartService {
    private final CartRepository cartRepository;


    public CartService(CartRepository cartRepository){
        this.cartRepository = cartRepository;
    }

    public Cart createCart(Cart cart){
        return cartRepository.save(cart);
    }

    //creates cart for every customer registration
    public Cart createCustomerCart(Customer customer){
        Cart cart = new Cart();
        cart.setCustomer(customer);//sets cart->user attr
        customer.setCart(cart);//sets user->cart attr
        return cartRepository.save(cart);
    }

    //query customer cart
    public Cart getCartByUser(Customer customer) {
        return cartRepository.findByCustomer(customer);
    }
}
