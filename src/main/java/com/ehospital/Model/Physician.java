package com.ehospital.Model;

import com.ehospital.DAO.Users;
import com.google.gson.annotations.SerializedName;
import exceptions.UnauthorizedException;
import java.util.ArrayList;
import java.util.List;

public class Physician extends User {

    private boolean hasAccess;

    public Physician(String name, int age, String gender, String username, String email, String phone, String password) {
        super(name, age, gender, password, email, "physician", phone, username);
        hasAccess = false;
    }

    public boolean hasAccess(Patient patient) {
        List<Physician> physicians = patient.getPhysicians();
        for (Physician physician : physicians) {
            if (this.getUniqueIdentifier().equals(physician.getUniqueIdentifier())) {
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
        return getEmail();
    }

    @Override
    public String register() {
        if (getPassword().length() < 7 || getPassword().length() > 8) {
            return "Password length must be between 7 and 8 characters";
        }
        return "Registered successfully";
    }

    @Override
    public boolean login(String username, String password) {

        return authenticateUser(username, password);
    }

}
