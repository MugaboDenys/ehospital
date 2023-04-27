<%-- 
    Document   : list-users
    Created on : Apr 22, 2023, 1:04:58 PM
    Author     : denys
--%>

<%@page import="com.ehospital.Model.User"%>
<%@page import="java.util.List"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h1>List of Users</h1>
        <table>
            <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Type</th>
                <th>Unique Identifier</th>
            </tr>
            <%
                List<User> users = (List<User>) request.getAttribute("users");
                for (User user : users) {
            %>
            <tr>
                <td><%= user.getName()%></td>
                <td><%= user.getAge()%></td>
                <td><%= user.getGender()%></td>
                <td><%= user.getClass().getSimpleName()%></td>
                <td><%= user.getUniqueIdentifier()%></td>
                <td><%= user.getPassword()%></td>

            </tr>
            <% }%>
        </table>
        <a href="signup.html">SignUp</a>
    </body>
</html>
