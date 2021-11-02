package com.loan.controller.web;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.loan.common.exception.OECode;
import com.loan.common.util.Constants;
import com.loan.common.util.ResourceUtil;
import com.loan.component.service.EmployeeLocal;
import com.loan.component.service.RoleFunctionLocal;
import com.loan.data.dto.EmployeeDTO;
import com.loan.data.entity.Menu;

/**
 * Provides API for Login
 *
 * @author Sriki
 */

@Controller
@PropertySource("classpath:oe.properties")
public class LoginController {

  final Logger logger = Logger.getLogger(LoginController.class.getName());


  @Autowired
  private EmployeeLocal employeeService;

  @Autowired
  Environment env;


  @Autowired
  private RoleFunctionLocal roleFunctionService;


  @RequestMapping(value = "/login", method = RequestMethod.POST)
  @ModelAttribute

  public ModelAndView login(final ModelMap model,
      final HttpServletRequest request, final HttpServletResponse response,
      HttpSession session) {

    if (session.isNew()) {
      final String errorLoc = this.env
          .getProperty(ResourceUtil.getPropertyKey(OECode.SESSION_EXPIRED));
      this.logger.info(errorLoc);
      model.addAttribute("error", errorLoc);

      return new ModelAndView("login");
    }

    List<Menu> menus = new ArrayList<Menu>();
    final String hrmsId = request.getParameter("uname");
    final String pwd = request.getParameter("passwd");
    // validate the user id & pwd
    final EmployeeDTO emp = this.employeeService.authenticate(hrmsId, pwd);
    request.getSession().setAttribute(Constants.USER_TOKEN, emp);

    if (null == emp) {
      final String errorLoc = this.env
          .getProperty(ResourceUtil.getPropertyKey(OECode.INVALID_USER));
      this.logger.info(errorLoc);
      model.addAttribute("error", errorLoc);

      return new ModelAndView("login");
    }
    model.addAttribute("home");

    try {
      menus = roleFunctionService.findRole(hrmsId);
      if (!menus.isEmpty())
        return new ModelAndView("home", "menus",
            roleFunctionService.findRole(hrmsId));
    }
    catch (Exception e) {
      e.printStackTrace();
    }
    return new ModelAndView("home");
  }


  @RequestMapping(value = "/logout")
  public String logout(final HttpServletRequest request,
      final HttpServletResponse response) {

    request.getSession().invalidate();
    return "login";
  }



}
