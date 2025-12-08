package com.app.majix.controller;

import com.app.majix.dto.OrderRequestDTO;
import com.app.majix.dto.OrderResponseDTO;
import com.app.majix.entity.Orders;
import com.app.majix.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/place")
    public ResponseEntity<OrderResponseDTO> placeOrder(@RequestBody OrderRequestDTO request) {
        OrderResponseDTO order = orderService.placeOrder(request);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/all")
    public ResponseEntity<List<OrderResponseDTO>> getAllOrders() {
        return ResponseEntity.ok( orderService.getAllOrders());
    }


    @PutMapping("/{orderId}/status")
    public ResponseEntity<String> updateStatus(@PathVariable Long orderId, @RequestParam String status) {
        try {
            orderService.updateOrderStatus(orderId, status);
            return ResponseEntity.ok("Status updated successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating status: " + e.getMessage());
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderResponseDTO>> getUserOrders(@PathVariable Long userId) {
        return ResponseEntity.ok(orderService.getOrdersByUser(userId));
    }

    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<String> cancelOrder(@PathVariable Long orderId) {
        try {
            orderService.cancelOrder(orderId);
            return ResponseEntity.ok("Order cancelled successfully");
        } catch (Exception e) {
            // This message will be sent back to React if they try to cancel a Shipped order
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}