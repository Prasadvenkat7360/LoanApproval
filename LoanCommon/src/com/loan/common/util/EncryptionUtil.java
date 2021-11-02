package com.loan.common.util;

import java.security.Key;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang.RandomStringUtils;


public class EncryptionUtil {

  private static Logger logger = Logger.getLogger(EncryptionUtil.class.getName());
  private String key = "RentItRentIt1971"; // 128 bit key
  // Create key and cipher
  private Key aesKey = new SecretKeySpec(key.getBytes(), "AES");
  private Cipher cipher;

  public EncryptionUtil() {
    try {
      cipher = Cipher.getInstance("AES");
    } catch (Exception e) {
      logger.log(Level.SEVERE, "Error while creating the cipher object " + e);
    }
  }
  
  public String encrypt(String value) {
	    byte[] encrypted = null;
	    try {
	      // encrypt the text
	      cipher.init(Cipher.ENCRYPT_MODE, aesKey);	      
	      encrypted = cipher.doFinal(value.getBytes());
	    } catch (Exception e) {
	    	logger.log(Level.SEVERE, "Error while encrypt process " + e);
	    }
	    return new String(new Base64().encodeAsString(encrypted));
	  }

	  public String decrypt(String value) {
	    String decrypted = null;
	    try {	
	      // decrypt the text
	      cipher.init(Cipher.DECRYPT_MODE, aesKey);
	      decrypted = new String(cipher.doFinal(value.getBytes()));
	    } catch (Exception e) {
	    	logger.log(Level.SEVERE, "Error while decrypt process " + e);
	    }
	    return decrypted;
	  }
  

	  
  /*public String encrypt(String value) {
    byte[] encrypted = null;
    try {
      // encrypt the text
      cipher.init(Cipher.ENCRYPT_MODE, aesKey);
      value = RandomStringUtils.random(8, value);  
      System.err.println(value);
      encrypted = cipher.doFinal(value.getBytes());
      System.err.println("encrypted: " + encrypted);
    } catch (Exception e) {
    	logger.log(Level.SEVERE, "Error while encrypt process " + e);
    }
    return new String(new Base64().encodeAsString(encrypted));
  }

  public String decrypt(String value) {
    String decrypted = null;
    try {
    	new Base64();
		byte[] b = Base64.decodeBase64(value);
      // decrypt the text
      cipher.init(Cipher.DECRYPT_MODE, aesKey);
      decrypted = new String(cipher.doFinal(b));
    } catch (Exception e) {
    	logger.log(Level.SEVERE, "Error while decrypt process " + e);
    }
    return decrypted;
  }*/
  
  
  public static void main(String[] args) throws Exception {
	    EncryptionUtil app = new EncryptionUtil();
	    String value =  "sriki.rama_ffff-12ddd@dsdfs=sfs+ddd.gov.in.org";
	    String pwd = PasswordUtil.generatePwd(value);
	    System.err.println("pwd: " + pwd);
	    String e = app.encrypt(pwd);
	    System.err.println("encrypt: " + e);
	    String d = app.encrypt(pwd);
	    System.err.println(d);
	    if(e.equals(d)) {
	    	System.err.println("same");
	    }
	    else {
	    	System.err.println("Different");
	    }
	    	
	  }  
}
