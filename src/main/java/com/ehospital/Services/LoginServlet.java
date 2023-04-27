package com.ehospital.Services;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.ehospital.DAO.Users;
import com.ehospital.Model.User;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.io.BufferedReader;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;
    private Users users;

    public void init() {
        users = Users.getUsersDao(getServletContext());
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        BufferedReader reader = request.getReader();
        Gson gson = new Gson();
        JsonObject jsonObject = gson.fromJson(reader, JsonObject.class);

        String uniqueIdentifier = jsonObject.get("uniqueIdentifier").getAsString();
        String password = jsonObject.get("password").getAsString();

        List<User> userList = users.getAllUser();

        for (User user : userList) {
            if (user.login(uniqueIdentifier, password)) {
                response.setStatus(HttpServletResponse.SC_OK);
                response.setContentType("application/json");
                PrintWriter out = response.getWriter();
                out.println("{\"message\": \"'Login successful.\", \"Payload\": " + gson.toJson(user) + "}");
                return;
            }
        }

        JsonObject jsonResponse = new JsonObject();
        jsonResponse.addProperty("message", "Invalid username or password.");
        response.setContentType("application/json");
        response.getWriter().write(jsonResponse.toString());
    }

}
