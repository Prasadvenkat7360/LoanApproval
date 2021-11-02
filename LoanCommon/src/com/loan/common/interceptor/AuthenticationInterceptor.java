package com.loan.common.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.loan.common.util.Constants;

public class AuthenticationInterceptor extends HandlerInterceptorAdapter{

	public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
            Object handler) throws Exception {
      
        boolean isSeesionValid = true;
        if(!request.getRequestURI().endsWith("login")){
			if(null == request.getSession().getAttribute(Constants.USER_TOKEN)) {
	        	response.sendRedirect(".");
	        	isSeesionValid = false;
	        }
       
        }
        return isSeesionValid;
    }
}
 