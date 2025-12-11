package com.app.majix.service;

import com.app.majix.dto.AdminCustomerViewDTO;
import com.app.majix.entity.Customer;
import com.app.majix.entity.Orders;
import com.app.majix.repository.CustomerRepository;
import com.app.majix.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminService {

    private final CustomerRepository customerRepository;
    private final OrderRepository orderRepository;

    public AdminService(CustomerRepository customerRepository, OrderRepository orderRepository) {
        this.customerRepository = customerRepository;
        this.orderRepository = orderRepository;
    }

    public List<AdminCustomerViewDTO> getAllCustomersWithStats() {
        List<Customer> customers = customerRepository.findAll(); // Fetches all customers
        List<AdminCustomerViewDTO> dtos = new ArrayList<>();

        for (Customer customer : customers) {
            // Fetch orders for this specific customer
            List<Orders> orders = orderRepository.findByCustomerUserId(customer.getUserId());

            int totalOrders = orders.size();

            // Sum up the totalAmount from all orders
            double totalSpent = orders.stream()
                    .mapToDouble(Orders::getTotalAmount)
                    .sum();

            dtos.add(new AdminCustomerViewDTO(
                    customer.getUserId(),
                    customer.getEmail(),
                    customer.getFirstname(),
                    customer.getLastname(),
                    customer.getPhonenumber(),
                    customer.getRole(),
                    totalOrders,
                    totalSpent,
                    customer.getJoinDate()
            ));
        }
        return dtos;
    }
}
