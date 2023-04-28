/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ehospital.Model;

/**
 *
 * @author denys
 */
public abstract class User {
    
    private String name;
    private int age;
    private String gender;
    private String password;
    private String email;
    private String userType;
    private String phone;
    private String username;
    
    public User() {}
    
    public User(String name, int age, String gender, String password, String email, String userType, String phone, String username) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.password = password;
        this.email = email;
        this.userType = userType;
        this.phone = phone;
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    public String getGender() {
        return gender;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public String getUserType() {
        return userType;
    }

    public String getPhone() {
        return phone;
    }

    public String getUsername() {
        return username;
    }

    public abstract String getUniqueIdentifier();

    public boolean authenticateUser(String uniqueIdentifier, String password) {
        return getUniqueIdentifier().equals(uniqueIdentifier) && getPassword().equals(password);
    }
    
    public abstract String register();

    public abstract boolean login(String username, String password);
    
}
