/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ehospital;

import com.ehospital.DAO.Users;
import com.ehospital.Model.Patient;
import com.ehospital.Model.Pharmacist;
import com.ehospital.Model.Physician;
import com.ehospital.Model.User;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 *
 * @author denys
 */
public class Main {

    public static void main(String[] args) {
        Users users = new Users();

        User patient1 = new Patient("Denys", 23, "Male", "DenysU", "denys@gmail.com", "098762323", "123456");
        User patient2 = new Patient("Eric", 34, "Male", "EricU", "eric@gmail.com", "098762323", "123456");

        User pharmacist1 = new Pharmacist("Christian", 12, "Male", "Christian", "chris@gmail.com", "09878323", "10203040");
        User pharmacist2 = new Pharmacist("Alice", 23, "Female", "Alice", "Alice@gmail.com", "782367643", "10203040");
//
        User physician1 = new Physician("Alex", 21, "Male", "Alex", "alex@gmail.com", "38923929", "1020304050");
        User physician2 = new Physician("Mary", 41, "Female", "Mary", "mary@gmail.com", "38923929", "1020304050");

        users.addUser(patient2);
        users.addUser(patient1);
        users.addUser(pharmacist1);
        users.addUser(pharmacist2);
        users.addUser(physician1);
        users.addUser(physician2);
//
        for (User user : users.getAllUser()) {
            System.out.println("Name: " + user.getName());
            System.out.println("Age: " + user.getAge());
            System.out.println("Gender: " + user.getGender());
            System.out.println("User type: " + user.getUserType());
            System.out.println("Email: " + user.getEmail());
            System.out.println("Phone: " + user.getPhone());
            System.out.println("Username: " + user.getUsername());
            System.out.println("-------------------------------");
        }

    }
}
