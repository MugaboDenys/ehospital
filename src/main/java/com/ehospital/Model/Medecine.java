/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ehospital.Model;

import java.util.Date;

/**
 *
 * @author denys
 */
public class Medecine {
    
    private String medName;
    private float medPrice;
    private Date expirationDate;

    public Medecine() {
    }

    public Medecine(String medName, float medPrice, Date expirationDate) {
        this.medName = medName;
        this.medPrice = medPrice;
        this.expirationDate = expirationDate;
    }

    public String getMedName() {
        return medName;
    }

    public void setMedName(String medName) {
        this.medName = medName;
    }

    public float getMedPrice() {
        return medPrice;
    }

    public void setMedPrice(float medPrice) {
        this.medPrice = medPrice;
    }

    public Date getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(Date expirationDate) {
        this.expirationDate = expirationDate;
    }
    
    
}
