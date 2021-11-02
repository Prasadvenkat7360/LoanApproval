package com.loan.common.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.loan.common.util.Constants;


@WebFilter("/api/*")
public class APIFilter implements Filter {

  @Override
  public void destroy() {}

  @Override
  public void doFilter(final ServletRequest servletRequest,
      final ServletResponse servletResponse, final FilterChain chain)
      throws IOException, ServletException {
    if (servletRequest instanceof HttpServletRequest) {
      ((HttpServletRequest) servletRequest).getRequestURL().toString();

      //check if user has logged in to access the API
      if (((HttpServletRequest) servletRequest).getSession().getAttribute(
          Constants.USER_TOKEN) != null) {
        chain.doFilter(servletRequest, servletResponse);
      }
      else {
        //not logged in. So send 401 response code
        ((HttpServletResponse) servletResponse).sendError(401,
            "Session Expired");
      }
    }
  }

  @Override
  public void init(final FilterConfig arg0) throws ServletException {}

}
