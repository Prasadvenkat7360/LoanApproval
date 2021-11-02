package com.loan.common.util;

import org.apache.commons.lang.RandomStringUtils;

public class PasswordUtil {
  public static String encrypt(String value) {
	return new EncryptionUtil().encrypt(value);
	  
  }
  
  public static String generatePwd(String value) {
	  if(value != null) {
		  //TODO remove hard coding & un-comment the below line
		  //value = "pass123";	
		  value = RandomStringUtils.random(8, value);
	  }
	  return value;
  }
}