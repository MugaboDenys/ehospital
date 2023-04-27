package com.ehospital.Services;

import com.ehospital.DAO.Users;
import com.ehospital.Model.Patient;
import com.ehospital.Model.Pharmacist;
import com.ehospital.Model.Physician;
import com.ehospital.Model.User;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.io.BufferedReader;
import java.util.ArrayList;
import javax.servlet.http.HttpSession;

public class AddAccessServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        BufferedReader reader = request.getReader();
        Gson gson = new Gson();
        JsonObject jsonObject = gson.fromJson(reader, JsonObject.class);

        String patientUsername = jsonObject.get("patientUsername").getAsString();
        String userName = jsonObject.get("username").getAsString();
        String userType = jsonObject.get("userType").getAsString();

        Users usersDao = Users.getUsersDao(request.getSession().getServletContext());
        Patient patient = (Patient) usersDao.getUser(patientUsername);

        if (userType.equals("pharmacist")) {
            Pharmacist pharmacist = (Pharmacist) usersDao.getUser(userName);
            System.out.println("Pharmacist************" + pharmacist.getName());
            if (pharmacist == null) {
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "Pharmacist not found");
                return;
            }
            patient.grantAccess(pharmacist);
        }
        
        if (userType.equals("physician")) {
            Physician physician = (Physician) usersDao.getUser(userName);
            System.out.println("Physician************" + physician.getName());
            if (physician == null) {
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "Pharmacist not found");
                return;
            }
            patient.grantAccess(physician);
        }

        if (patient == null) {
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "Patient not found");
            return;
        }

        usersDao.updateUser(patient);

        List<User> users = usersDao.getAllUser();
        String json = gson.toJson(users);

        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        out.print(json);
        out.flush();
    }

}
