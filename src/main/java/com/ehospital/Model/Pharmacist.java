package com.ehospital.Model;

import com.google.gson.annotations.SerializedName;
import java.util.List;

public class Pharmacist extends User {

        private boolean hasAccess;
    public Pharmacist(String name, int age, String gender, String username, String email, String phone, String password) {
        super(name, age, gender, password, email, "pharmacist", phone, username);
        hasAccess = false;
    }
    
    public boolean hasAccess(Patient patient) {
        List<Pharmacist> pharmacist = patient.getPharmacists();
        for (Pharmacist pharma : pharmacist) {
            if (this.getEmail().equals(pharma.getEmail())) {
                return true;
            }
        }
        return false;
    }

    public void setHasAccess(boolean hasAccess) {
        this.hasAccess = hasAccess;
    }

    public boolean getHasAccess() {
        return hasAccess;
    }

    @Override
    public String getUniqueIdentifier() {
        return getPhone();
    }

    @Override
    public String register() {
        if (getPassword().length() < 9 || getPassword().length() > 10) {
            return "Password length must be between 9 and 10 characters";
        }
        return "Registered successfully";
    }

    @Override
    public boolean login(String username, String password) {
        return authenticateUser(username, password);
    }
}
