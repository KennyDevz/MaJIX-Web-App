package com.app.majix.controller;

import com.app.majix.entity.Customer;
import com.app.majix.entity.SavedPaymentMethod;
import com.app.majix.repository.CustomerRepository;
import com.app.majix.repository.SavedPaymentMethodRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payment-methods")
@CrossOrigin(origins = "http://localhost:3000")
public class SavedPaymentMethodController {
    private final SavedPaymentMethodRepository paymentMethodRepository;
    private final CustomerRepository customerRepository;

    public SavedPaymentMethodController(SavedPaymentMethodRepository paymentMethodRepository, CustomerRepository customerRepository) {
        this.paymentMethodRepository = paymentMethodRepository;
        this.customerRepository = customerRepository;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SavedPaymentMethod>> getUserMethods(@PathVariable Long userId) {
        return ResponseEntity.ok(paymentMethodRepository.findByCustomerUserId(userId));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addMethod(@RequestBody Map<String, Object> payload) {
        Long userId = Long.valueOf(payload.get("userId").toString());
        String type = (String) payload.get("type");
        String number = (String) payload.get("accountNumber");

        Customer customer = customerRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 1. Mask the number FIRST
        String masked = number;
        if (number != null && number.length() > 4) {
            masked = "**** " + number.substring(number.length() - 4);
        } else {
            masked = number;
        }

        // 2. --- DUPLICATE CHECK ---
        // Before saving, check if this combo (User + Type + Number) exists
        boolean exists = paymentMethodRepository.existsByCustomerUserIdAndTypeAndIdentifier(userId, type, masked);

        if (exists) {
            return ResponseEntity.badRequest().body("Error: This payment method is already saved in your account.");
        }

        // 3. SET DETERMINISTIC MOCK BALANCES
        double simulatedBalance;
        switch (type) {
            case "GCash":
                simulatedBalance = 2000.00;
                break;
            case "PayPal":
                simulatedBalance = 10000.00;
                break;
            case "Credit Card":
                simulatedBalance = 50000.00;
                break;
            default:
                simulatedBalance = 5000.00;
        }

        SavedPaymentMethod method = new SavedPaymentMethod(customer, type, masked, simulatedBalance);
        paymentMethodRepository.save(method);

        return ResponseEntity.ok("Payment method saved");
    }
}