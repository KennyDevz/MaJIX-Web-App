package com.app.majix.controller;

import com.app.majix.dto.AdminCustomerViewDTO;
import com.app.majix.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/customers")
    public ResponseEntity<List<AdminCustomerViewDTO>> getAllCustomers() {
        List<AdminCustomerViewDTO> customers = adminService.getAllCustomersWithStats();
        return ResponseEntity.ok(customers);
    }
}