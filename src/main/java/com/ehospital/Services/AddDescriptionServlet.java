/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package com.ehospital.Services;

import com.ehospital.DAO.Users;
import com.ehospital.Model.Patient;
import com.ehospital.Model.Pharmacist;
import com.ehospital.Model.Physician;
import com.ehospital.Model.User;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author denys
 */
public class AddDescriptionServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        BufferedReader reader = request.getReader();
        Gson gson = new Gson();
        JsonObject jsonObject = gson.fromJson(reader, JsonObject.class);
        String patientName = jsonObject.get("patientUsername").getAsString();
        String identifier = jsonObject.get("identifier").getAsString();
        String userType = jsonObject.get("userType").getAsString();

        Users usersDao = Users.getUsersDao(request.getSession().getServletContext());
        Patient patient = (Patient) usersDao.getUser(patientName);

        System.out.println("HHH");

        if (userType.equals("pharmacist")) {
            String meds = jsonObject.get("meds").getAsString();
            Pharmacist pharmacist = (Pharmacist) usersDao.getUser(identifier);
            System.out.println("Pharmacist************" + pharmacist.getName());

            if (!patient.getPharmacists().contains(pharmacist)) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
                return;
            }
            if (pharmacist == null) {
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "Pharmacist not found");
                return;
            }
            patient.setPharmacistMeds(meds);
        }

        if (userType.equals("physician")) {
            Physician physician = (Physician) usersDao.getUser(identifier);
            String diseaseDescription = jsonObject.get("diseaseDescription").getAsString();
            System.out.println("Physician************" + physician.getName());

            if (!patient.getPhysicians().contains(physician)) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
                return;
            }
            if (physician == null) {
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "Pharmacist not found");
                return;
            }
            patient.setPhysicianDescription(diseaseDescription);
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
