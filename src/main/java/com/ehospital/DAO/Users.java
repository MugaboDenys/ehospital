/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ehospital.DAO;

import java.util.LinkedHashMap;
import com.ehospital.Model.User;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletContext;

/**
 *
 * @author denys
 */
public class Users {

    private LinkedHashMap<String, User> users;

    public static Users getUsersDao(ServletContext context) {
        Users usersDao = (Users) context.getAttribute("usersDao");
        if (usersDao == null) {
            usersDao = new Users();
            context.setAttribute("usersDao", usersDao);
        }
        return usersDao;
    }

    public Users() {
        users = new LinkedHashMap<>();
    }

    public void addUser(User user) {
        users.put(user.getUniqueIdentifier(), user);
    }
    
    public void updateUser(User user) {
        users.put(user.getUniqueIdentifier(), user);
    }

    public User getUser(String uniqueIdentifier) {
        return users.get(uniqueIdentifier);
    }

    public LinkedHashMap<String, User> getAllUsers() {
        return users;
    }

    public List<User> getAllUser() {
        return new ArrayList<>(users.values());
    }

}
