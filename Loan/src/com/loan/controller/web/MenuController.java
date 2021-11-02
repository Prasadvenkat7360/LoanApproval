package com.loan.controller.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Provides API for Login
 *
 * @author Venkat
 */
@Controller
@PropertySource("classpath:oe.properties")
public class MenuController {

	final Logger logger = Logger.getLogger(MenuController.class.getName());

	@Autowired
	Environment env;

	@RequestMapping(value = "/home")
	public String logout(final HttpServletRequest request, final HttpServletResponse response) {

		return "home";
	}

	@RequestMapping("/aboutus")
	public String aboutUs() {
		return "aboutus";
	}

	@RequestMapping("/termsCondition")
	public String termsCondition() {
		return "termsCondition";
	}

	@RequestMapping("/privacyPolicy")
	public String privacyPolicy() {
		return "privacyPolicy";
	}

	@RequestMapping("/contactUs")
	public String contactUs() {
		return "contactUs";
	}

	@RequestMapping("/faq")
	public String faq() {
		return "faq";
	}

}
