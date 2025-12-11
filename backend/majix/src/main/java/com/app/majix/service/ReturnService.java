package com.app.majix.service;

import com.app.majix.dto.ReturnRequestDTO;
import com.app.majix.dto.ReturnResponseDTO;
import com.app.majix.entity.Customer;
import com.app.majix.entity.OrderItem;
import com.app.majix.entity.Orders;
import com.app.majix.entity.Returns;
import com.app.majix.repository.CustomerRepository;
import com.app.majix.repository.OrderItemRepository;
import com.app.majix.repository.ReturnRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.app.majix.utils.ColorUtils;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReturnService {

    private final ReturnRepository returnRepository;
    private final OrderItemRepository orderItemRepository;
    private final CustomerRepository customerRepository;

    public ReturnService(ReturnRepository returnRepository,
                         OrderItemRepository orderItemRepository,
                         CustomerRepository customerRepository) {
        this.returnRepository = returnRepository;
        this.orderItemRepository = orderItemRepository;
        this.customerRepository = customerRepository;
    }

    public List<ReturnResponseDTO> getAllReturns() {
        return returnRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public void updateReturnStatus(Long returnId, String status) {
        Returns returnRequest = returnRepository.findById(returnId)
                .orElseThrow(() -> new RuntimeException("Return request not found"));

        if ("APPROVED".equalsIgnoreCase(status) && !"APPROVED".equalsIgnoreCase(returnRequest.getStatus())) {
            OrderItem item = returnRequest.getOrderItem();
            item.setReturnedQty(item.getReturnedQty() + returnRequest.getQuantity());
            orderItemRepository.save(item);
        }

        returnRequest.setStatus(status.toUpperCase());
        returnRepository.save(returnRequest);
    }

    // --- CUSTOMER: Get My Returns (Fixes your GET error) ---
    public List<ReturnResponseDTO> getReturnsByCustomer(Long customerId) {
        return returnRepository.findByCustomerUserId(customerId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // --- CUSTOMER: Create Return Request ---
    @Transactional
    public Returns createReturnRequest(Long customerId, ReturnRequestDTO request) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found."));

        OrderItem orderItem = orderItemRepository.findById(request.getOrderItemId())
                .orElseThrow(() -> new RuntimeException("Order item not found."));

        Orders order = orderItem.getOrder();

        if (!"DELIVERED".equalsIgnoreCase(order.getStatus())) {
            throw new RuntimeException("Cannot return item. Order is not DELIVERED.");
        }

        if (!order.getCustomer().getUserId().equals(customerId)) {
            throw new RuntimeException("Unauthorized: Order does not belong to this customer.");
        }

        if (orderItem.getReturnedQty() > 0) {
            throw new RuntimeException("This item has already been processed for return.");
        }

        int quantityToReturn = orderItem.getQty();

        // 6. Create Return
        Returns newReturn = new Returns(orderItem, customer, request.getReason(), quantityToReturn);
        return returnRepository.save(newReturn);
    }

    private ReturnResponseDTO mapToDTO(Returns returnRequest) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        String prodName = returnRequest.getOrderItem().getVariant().getProduct().getName()
                + " (" + returnRequest.getOrderItem().getVariant().getSize()
                + "/" + ColorUtils.getColorName(returnRequest.getOrderItem().getVariant().getColor()) + ")";

        String imageUrl = returnRequest.getOrderItem().getVariant().getImageUrl();

        return new ReturnResponseDTO(
                returnRequest.getReturnId(),
                returnRequest.getReason(),
                returnRequest.getStatus(),
                returnRequest.getRequestDate().format(formatter),
                returnRequest.getOrderItem().getOrder().getOrderId(),
                returnRequest.getCustomer().getFirstname() + " " + returnRequest.getCustomer().getLastname(),
                prodName,
                imageUrl
        );
    }
}