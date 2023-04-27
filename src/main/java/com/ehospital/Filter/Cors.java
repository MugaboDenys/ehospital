/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ehospital.Filter;

/**
 *
 * @author denys
 */
import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletResponse;

@WebFilter(asyncSupported = true, urlPatterns = { "/*" })
public class Cors implements javax.servlet.Filter {
    @Override
  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
      throws IOException, ServletException {
    ((HttpServletResponse) response).addHeader("Access-Control-Allow-Methods", "GET, OPTIONS, HEAD, PUT, POST");
    ((HttpServletResponse) response).addHeader("Access-Control-Allow-Headers", "*");
    ((HttpServletResponse) response).addHeader("Access-Control-Origin", "*");
    // pass the request along the filter chain
    chain.doFilter(request, response);
  }

   public void init(FilterConfig fConfig) throws ServletException {
    // TODO Auto-generated method stub
  }

  @Override
  public void destroy() {
    // TODO Auto-generated method stub
  }
}