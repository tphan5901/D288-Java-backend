package com.example.demo.services;

import com.example.demo.dao.CartRepository;
import com.example.demo.dao.CustomerRepository;
import com.example.demo.entities.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

import static com.example.demo.entities.StatusType.*;

@Service
public class CheckoutServiceImpl implements CheckoutService{

    private CustomerRepository customerRepository;
    private CartRepository cartRepository;


    public CheckoutServiceImpl(CustomerRepository customerRepository, CartRepository cartRepository) {
        this.customerRepository = customerRepository;
        this.cartRepository = cartRepository;

    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        try {
            Cart cart = purchase.getCart();
            Set<CartItem> cartItems = purchase.getCartItems();
            Customer customer = purchase.getCustomer();

            if (customer == null || cartItems.isEmpty()) {
                throw new IllegalArgumentException("Customer cannot be null and cart items cannot be empty.");
            }

            // Set order details
            cart.setOrderTrackingNumber(generateOrderTrackingNumber());
            cartItems.forEach(item -> item.setCart(cart));
            cart.setCartitem(cartItems);
            cart.setCustomer(customer);
            cart.setStatus(ordered);

            customerRepository.save(customer);
            cartRepository.save(cart);

            return new PurchaseResponse(cart.getOrderTrackingNumber());
        } catch (Exception e) {
            return new PurchaseResponse("Error: " + e.getMessage());
        }
    }

    private String generateOrderTrackingNumber() {
        return UUID.randomUUID().toString();
    }
}