package com.example.demo.entities;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="excursions")
@Getter
@Setter
@NoArgsConstructor
public class Excursion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "excursion_id")
    private Long excursion_id;

    @Column(name = "excursion_title")
    private String excursion_title;

    @Column(name = "excursion_price")
    private BigDecimal excursion_price;

    @Column(name = "image_url")
    private String imageURL;

    @Column(name = "create_date")
    @CreationTimestamp
    private Date create_date;

    @Column(name = "last_update")
    @UpdateTimestamp
    private Date last_update;

    @ManyToOne
    @JoinColumn(name="vacation_id")
    private Vacation vacation;

    @ManyToMany
    @JoinTable(name="excursion_cartitem", joinColumns=@JoinColumn(name="cart_item_id"),
            inverseJoinColumns=@JoinColumn(name="excursion_id"))
    Set<CartItem> cartItems = new HashSet<>();


}
