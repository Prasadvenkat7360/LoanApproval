package com.loan.common.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class ConfigProperty {

  public static String getProperty(String key) {
    final Properties prop = new Properties();
    InputStream input = null;
    String fromEmail = "";
    try {
      final String filename = "email.properties";
      input =
          ConfigProperty.class.getClassLoader().getResourceAsStream(filename);
      if (input == null) {
        return filename;
      }
      prop.load(input);
      fromEmail = prop.getProperty(key);
    }
    catch (final IOException ex) {
      ex.printStackTrace();
    }
    finally {
      if (input != null) {
        try {
          input.close();
        }
        catch (final IOException e) {
          e.printStackTrace();
        }
      }
    }
    return fromEmail;
  }


  public static String getFASendPoint(String key) {
    final Properties prop = new Properties();
    InputStream input = null;
    String endpoint = "";
    try {
      final String filename = "oe.properties";
      input =
          ConfigProperty.class.getClassLoader().getResourceAsStream(filename);
      if (input == null) {
        return filename;
      }
      prop.load(input);
      endpoint = prop.getProperty(key);
    }
    catch (final IOException ex) {
      ex.printStackTrace();
    }
    finally {
      if (input != null) {
        try {
          input.close();
        }
        catch (final IOException e) {
          e.printStackTrace();
        }
      }
    }
    return endpoint;
  }


}
