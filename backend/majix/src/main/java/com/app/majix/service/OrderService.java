package com.app.majix.service;

import com.app.majix.dto.OrderItemDTO;
import com.app.majix.dto.OrderRequestDTO;
import com.app.majix.dto.OrderResponseDTO;
import com.app.majix.entity.*;
import com.app.majix.repository.CartRepository;
import com.app.majix.repository.CustomerRepository;
import com.app.majix.repository.OrderRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final CartRepository cartRepository;
    private final CartService cartService; // Need this to close the cart properly

    public OrderService(OrderRepository orderRepository, CustomerRepository customerRepository, CartRepository cartRepository, CartService cartService) {
        this.orderRepository = orderRepository;
        this.customerRepository = customerRepository;
        this.cartRepository = cartRepository;
        this.cartService = cartService;
    }

    @Transactional
    public OrderResponseDTO placeOrder(OrderRequestDTO request) {
        // 1. Validate Customer
        Customer customer = customerRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        // 2. Find the ACTIVE Cart (We need the specific one to link it)
        Cart cart = cartRepository.findByCustomerUserIdAndStatus(request.getUserId(), "ACTIVE")
                .orElseThrow(() -> new RuntimeException("Cart is empty. Cannot place order."));

        if (cart.getCartItems().isEmpty()) {
            throw new RuntimeException("Cart is empty.");
        }

        // 3. Create Order
        Orders order = new Orders();
        order.setCustomer(customer);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        order.setOrderDate(LocalDateTime.now().format(formatter));
        order.setStatus("PENDING");
        order.setTotalAmount(cart.getTotalAmount());
        order.setPaymentMethod(request.getPaymentMethod());

        // 4. Link the Cart (1:1 Relationship) - This satisfies your professor's requirement
        order.setCart(cart);

        // 5. Snapshot Address
        String fullAddress = request.getStreet() + ", " + request.getCity() + ", " +
                request.getProvince() + ", " + request.getCountry() + " " + request.getZipCode();
        order.setShippingAddress(fullAddress);

        //


        // 6. Create Order Items (Copy from Cart)
        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItem cartItem : cart.getCartItems()) {
            OrderItem orderItem = new OrderItem(
                    order,
                    cartItem.getProductVariant(),
                    cartItem.getQty(),
                    cartItem.getProductVariant().getPrice()
            );
            orderItems.add(orderItem);
        }
        order.setOrderItems(orderItems);

        // 7. Save Order
        Orders savedOrder = orderRepository.save(order);

        // 8. Close the Cart
        // We do NOT delete items. We just mark the cart as CLOSED so it's preserved in history.
        cartService.closeCart(cart.getCartId());

        // 9. Return Response DTO
        List<OrderItemDTO> itemDTOs = savedOrder.getOrderItems().stream()
                .map(item -> new OrderItemDTO(
                        item.getVariant().getProduct().getName(),
                        item.getVariant().getSize(),
                        item.getVariant().getColor(),
                        item.getPriceAtPurchase(),
                        item.getQty(),
                        item.getPriceAtPurchase() * item.getQty(),
                        item.getVariant().getImageUrl()
                )).collect(Collectors.toList());

        return new OrderResponseDTO(
                savedOrder.getOrderId(),
                savedOrder.getStatus(),
                savedOrder.getTotalAmount(),
                savedOrder.getOrderDate(),
                savedOrder.getPaymentMethod(),
                savedOrder.getShippingAddress(),
                itemDTOs,
                cart.getCartId(),
                String.format(savedOrder.getCustomer().getFirstname() + savedOrder.getCustomer().getLastname()) ,
                savedOrder.getCustomer().getEmail()
                // Return the linked cart ID to prove the connection
        );
    }

    public List<OrderResponseDTO> getAllOrders() {
        List<Orders> orders = orderRepository.findAll();

        return orders.stream().map(order -> {
            List<OrderItemDTO> itemDTOs = order.getOrderItems().stream().map(item -> {
                double subtotal = item.getPriceAtPurchase() * item.getQty();

                String pName = "Unknown Product";
                String pSize = "N/A";
                String pColor = "N/A";
                String pImage = " ";

                if(item.getVariant() != null){
                    pSize = item.getVariant().getSize();
                    pColor = item.getVariant().getColor();

                    if(item.getVariant().getProduct() != null){
                        pName = item.getVariant().getProduct().getName();
                        pImage = item.getVariant().getProduct().getImageUrl();
                    }
                }

                return new OrderItemDTO(
                        pName,
                        pSize,
                        pColor,
                        item.getPriceAtPurchase(),
                        item.getQty(),
                        subtotal,
                        pImage
                );
            }).collect(Collectors.toList());

            // 2. Map Customer Info
            String custName = (order.getCustomer() != null)
                    ? order.getCustomer().getFirstname() + " " + order.getCustomer().getLastname()
                    : "Guest";
            String custEmail = (order.getCustomer() != null)
                    ? order.getCustomer().getEmail()
                    : "No Email";

            return new OrderResponseDTO(
                    order.getOrderId(),
                    order.getStatus(),
                    order.getTotalAmount(),
                    order.getOrderDate(),
                    order.getPaymentMethod(),
                    order.getShippingAddress(),
                    itemDTOs,
                    (order.getCart() != null) ? order.getCart().getCartId() : null,
                    custName,
                    custEmail
            );
        }).collect(Collectors.toList());
     }
}