package com.ehospital.Services;

import com.ehospital.DAO.Users;
import com.ehospital.Model.Patient;
import com.ehospital.Model.Physician;
import com.ehospital.Model.User;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/list-users")
public class ListUsersServlet extends HttpServlet {

    private Users usersDao;

    public void init() {
        usersDao = Users.getUsersDao(getServletContext());
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        List<User> users = new ArrayList<>(Users.getUsersDao(getServletContext()).getAllUsers().values());

        Map<String, Object> usersMap = new LinkedHashMap<>();
        for (User user : users) {
            Map<String, Object> userMap = new LinkedHashMap<>();
            userMap.put("userType", user.getUserType());
            userMap.put("name", user.getName());
            userMap.put("username", user.getUsername());
            userMap.put("Age", user.getAge());
            userMap.put("gender", user.getGender());
            userMap.put("uniqueIdentifier", user.getUniqueIdentifier());
            userMap.put("email", user.getEmail());
            userMap.put("phone", user.getPhone());

            if (user instanceof Patient) {
                Patient patient = (Patient) user;
                userMap.put("physicians", patient.getPhysicians());
                userMap.put("pharmacists", patient.getPharmacists());
            } else if (user instanceof Physician) {
                Physician physician = (Physician) user;
                userMap.put("hasAccess", false); // default value
                List<User> patients = new ArrayList<>();
                for (User u : usersDao.getAllUser()) {
                    if (u instanceof Patient) {
                        patients.add(u);
                    }
                }
                for (User patient : patients) {
                    Patient p = (Patient) patient;
                    if (p.getPhysicians().contains(physician)) {
                        userMap.put("hasAccess", true);
                        break;
                    }
                }
            }
            usersMap.put(user.getUsername(), userMap);
        }

        response.setContentType("application/json");
        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(usersMap);
        PrintWriter out = response.getWriter();
        out.print(json);
    }

}
