package com.example.demo.entities;

import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="customers")
@Getter
@Setter
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id", nullable = false)
    private Long id;

    @Column(name = "customer_first_name", nullable = false)
    public String firstName;

    @Column(name = "customer_last_name")
    public String lastName;

    @Column(name = "address")
    public String address;

    @Column(name = "postal_code")
    public String postalcode;

    @Column(name = "phone")
    public String phone;

    @Column(name = "create_date", nullable = false)
    @CreationTimestamp
    public Date create_date;

    @Column(name = "last_update", nullable = false)
    @UpdateTimestamp
    public Date last_update;

    @ManyToOne
    @JoinColumn(name = "division_id")
    public Division division;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    public Set<Cart> cart = new HashSet<>();

    public Set<Cart> getCart() {
        return cart;
    }

    public void setFirstName(String firstname) {
        this.firstName = firstname;
    }

    public void setLastName(String lastname) {
        this.lastName = lastname;
    }

    public void setPostalCode(String code) {
        this.postalcode = code;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

}
