/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package com.ehospital.Services;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.opencsv.CSVWriter;
import java.io.BufferedReader;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author denys
 */
public class DownloadCSVServlet extends HttpServlet {
  protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    Gson gson = new Gson();
    BufferedReader reader = request.getReader();
    JsonObject jsonObject = gson.fromJson(reader, JsonObject.class);

    String medName = jsonObject.get("medName").getAsString();
    String medPrice = jsonObject.get("medPrice").getAsString();
    String expirationDate = jsonObject.get("expirationDate").getAsString();

    response.setContentType("text/csv");
    response.setHeader("Content-Disposition", "attachment; filename=\"data.csv\"");

    String[] header = {"Medicine Name", "Medicine Price", "Expiration Date"};
    String[] data = {medName, medPrice, expirationDate};

    CSVWriter writer = new CSVWriter(response.getWriter());
    writer.writeNext(header);
    writer.writeNext(data);

    writer.close();
  }
}

