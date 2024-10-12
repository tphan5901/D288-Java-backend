package com.example.demo.services;

import lombok.Data;
import lombok.NonNull;

@Data
public class  PurchaseResponse {

    @NonNull
    private String orderTrackingNumber;

    public PurchaseResponse(String s) {

    }

}
