package com.example.demo.services;

import com.example.demo.entities.Cart;
import com.example.demo.entities.CartItem;
import com.example.demo.entities.Customer;
import lombok.Data;
import java.util.Set;

@Data
public class Purchase {
    private Customer customer;
    private Cart cart;
    private Set<CartItem> cartItems;

    public Customer getCustomer() {
        return customer;  // return the actual customer
    }

    public Set<CartItem> getCartItems() {
        return cartItems; // return the actual cart items
    }

    public Cart getCart() {
        return cart;      // return the actual cart
    }
}

