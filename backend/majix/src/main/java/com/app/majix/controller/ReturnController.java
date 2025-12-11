package com.app.majix.controller;

import com.app.majix.dto.ReturnRequestDTO;
import com.app.majix.dto.ReturnResponseDTO;
import com.app.majix.entity.Returns;
import com.app.majix.service.ReturnService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/returns")
@CrossOrigin(origins = "http://localhost:3000")
public class ReturnController {

    private final ReturnService returnService;

    public ReturnController(ReturnService returnService) {
        this.returnService = returnService;
    }

    // --- Admin: Get All ---
    @GetMapping
    public List<ReturnResponseDTO> getAllReturns() {
        return returnService.getAllReturns();
    }

    // --- Admin: Update Status ---
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        try {
            String status = payload.get("status");
            returnService.updateReturnStatus(id, status);
            return ResponseEntity.ok().body("Status updated successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // --- Customer: Request Return ---
    @PostMapping("/customer/{customerId}")
    public ResponseEntity<?> requestReturn(@PathVariable Long customerId, @RequestBody ReturnRequestDTO request) {
        try {
            Returns createdReturn = returnService.createReturnRequest(customerId, request);
            return ResponseEntity.ok(createdReturn);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // --- CUSTOMER: Get My Returns (This fixes your error) ---
    @GetMapping("/customer/{customerId}")
    public List<ReturnResponseDTO> getCustomerReturns(@PathVariable Long customerId) {
        return returnService.getReturnsByCustomer(customerId);
    }
}