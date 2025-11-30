package com.app.majix.controller;

import com.app.majix.dto.OrderRequestDTO;
import com.app.majix.dto.OrderResponseDTO;
import com.app.majix.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}