package com.example.demo.entities;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="cart_items")
@Getter
@Setter
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_item_id")
    private Long id;

    @ManyToMany(cascade=CascadeType.ALL, mappedBy = "cartItems")
    private Set<Excursion> excursions = new HashSet<>();

    @Column(name = "create_date")
    @CreationTimestamp
    private Date create_date;

    @Column(name = "last_update")
    @UpdateTimestamp
    private Date last_update;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="cart_id")
    public Cart cart;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="vacation_id")
    private Vacation vacation;


    public void setCart(Cart cart) {
        this.cart = cart;
    }
}
