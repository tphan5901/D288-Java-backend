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
    private final CustomerRepository customerRepository;
    private final CartRepository cartRepository;

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

            if (customer == null) {
                throw new IllegalArgumentException("Customer: None");
            }
            if(cartItems.isEmpty()){
                throw new IllegalArgumentException("cart items cannot be empty");
            }

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