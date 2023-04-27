package com.ehospital.Services;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.ehospital.DAO.Users;
import com.ehospital.Model.Patient;
import com.ehospital.Model.Pharmacist;
import com.ehospital.Model.Physician;
import com.ehospital.Model.User;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.io.BufferedReader;

@WebServlet("/signup")
public class SignUpServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;
    private Users users;

    public void init() {
        users = Users.getUsersDao(getServletContext());
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        BufferedReader reader = request.getReader();
        Gson gson = new Gson();
        JsonObject jsonObject = gson.fromJson(reader, JsonObject.class);

        String userType = jsonObject.get("userType").getAsString();
        String name = jsonObject.get("name").getAsString();
        int age = jsonObject.get("age").getAsInt();
        String gender = jsonObject.get("gender").getAsString();
        String password = jsonObject.get("password").getAsString();
        String phone = jsonObject.get("phone").getAsString();
        String username = jsonObject.get("username").getAsString();
        String email = jsonObject.get("email").getAsString();
        String identifier;
        User user;
        
        switch (userType) {
            case "patient":
                identifier = username;
                user = new Patient(name, age, gender, username, email, phone, password);
                break;
            case "physician":
                identifier = email;
                user = new Physician(name, age, gender, username, email, phone, password);
                break;
            case "pharmacist":
                identifier = phone;
                user = new Pharmacist(name, age, gender, username, email, phone, password);
                break;
            default:
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.setContentType("application/json");
                PrintWriter out = response.getWriter();
                out.println("{\"message\": \"Error: invalid user type.\"}");
                return;
        }
        User patient1 = new Patient("Denys", 23, "Male", "DenysU", "denys@gmail.com", "098762323", "123456");
        User patient2 = new Patient("Eric", 34, "Male", "EricU", "eric@gmail.com", "098762323", "123456");

        User pharmacist1 = new Pharmacist("Christian", 12, "Male", "Christian", "chris@gmail.com", "09878323", "102030405");
        User pharmacist2 = new Pharmacist("Alice", 23, "Female", "Alice", "Alice@gmail.com", "782367643", "102030405");
//
        User physician1 = new Physician("Alex", 21, "Male", "Alex", "alex@gmail.com", "38923929", "10203040");
        User physician2 = new Physician("Mary", 41, "Female", "Mary", "mary@gmail.com", "38923929", "10203040");
        users.addUser(patient2);
        users.addUser(patient1);
        users.addUser(pharmacist1);
        users.addUser(pharmacist2);
        users.addUser(physician1);
        users.addUser(physician2);
        
        if (user != null) {
            String result = user.register();
            if (!result.equals("Registered successfully")) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.setContentType("application/json");
                PrintWriter out = response.getWriter();
                out.println("{\"message\": \"Error: " + result + ".\"}");
                return;
            }
            users.addUser(user);
            System.out.println("New user added: " + user.getName() + ", " + user.getAge() + ", " + user.getGender() + ", " + user.getUniqueIdentifier() + ", " + user.getPassword());
            response.setStatus(HttpServletResponse.SC_OK);
            response.setContentType("application/json");
            PrintWriter out = response.getWriter();
            out.println("{\"message\": \"User successfully registered.\", \"Payload\": " + gson.toJson(user) + "}");
        }
    }
}
