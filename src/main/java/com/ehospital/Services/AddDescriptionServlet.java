/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package com.ehospital.Services;

import com.ehospital.DAO.Users;
import com.ehospital.Model.Patient;
import com.ehospital.Model.Physician;
import java.io.IOException;
import java.io.PrintWriter;
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

        String patientUsername = request.getParameter("patientUsername");

        String diseaseDescription = request.getParameter("diseaseDescription");

        Physician physician = (Physician) request.getSession().getAttribute("user");

        Users usersDao = Users.getUsersDao(request.getSession().getServletContext());
        Patient patient = (Patient) usersDao.getUser(patientUsername);

        // Check if the patient has granted access to the physician
        if (!patient.getPhysicians().contains(physician)) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
            return;
        }

        // Set the description of the disease for the patient
        patient.setPhysicianDescription(diseaseDescription);

        // Update the patient object in the usersDao
        usersDao.updateUser(patient);

    }
}
