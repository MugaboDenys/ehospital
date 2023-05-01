/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ehospital.Model;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author denys
 */
public class Patient extends User {

    private List<Physician> physicians;
    private List<Pharmacist> pharmacists;
    private String physicianDescription;
    private List<Medecine> pharmacistMeds;

    public Patient(String name, int age, String gender, String username, String email, String phone, String password) {
        super(name, age, gender, password, email, "patient", phone, username);
        physicians = new ArrayList<>();
        pharmacists = new ArrayList<>();
        physicianDescription = "";
        pharmacistMeds = new ArrayList<>();
    }

    public String getPhysicianDescription() {
        return physicianDescription;
    }

    public void setPhysicianDescription(String physicianDescription) {
        this.physicianDescription = physicianDescription;
    }

    public List<Medecine> getPharmacistMeds() {
        return pharmacistMeds;
    }

    public void setPharmacistMeds(Medecine pharmaMedecine) {
        pharmacistMeds.add(pharmaMedecine);
    }

    public void grantAccess(Physician physician) {
        if (!physicians.isEmpty()) {
            throw new IllegalStateException("You already gave access to a physician");
        }

        physicians.add(physician);
        for (Physician p : physicians) {
            if (p.getPhone().equals(physician.getPhone())) {
                p.setHasAccess(true);
                break;
            }
        }
    }

    public void grantAccess(Pharmacist pharmacist) {
        if (!pharmacists.isEmpty()) {
            throw new IllegalStateException("You already gave access to a pharmacist");
        }

        pharmacists.add(pharmacist);
        for (Pharmacist p : pharmacists) {
            if (p.getPhone().equals(pharmacist.getPhone())) {
                p.setHasAccess(true);
                break;
            }
        }
    }

    public List<Physician> getPhysicians() {
        return physicians;
    }

    public List<Pharmacist> getPharmacists() {
        return pharmacists;
    }

    @Override
    public String getUniqueIdentifier() {
        return getUsername();
    }

    @Override
    public String register() {
        if (getPassword().length() < 4 || getPassword().length() > 6) {
            return "Password length must be between 4 and 6 characters";
        }
        return "Registered successfully";
    }

    @Override
    public boolean login(String username, String password) {
        return authenticateUser(username, password);
    }

}
