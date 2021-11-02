/**
 * 
 */
package com.loan.common.util;

import java.io.InputStream;
import java.text.MessageFormat;
import java.util.Properties;
import java.util.logging.Logger;

/**
 * @author 
 * 
 */
public class MessageUtil {

  private static Properties properties;
  private static Logger logger = Logger.getLogger(MessageUtil.class.getName());
  /*
   * loads the properties from properties file( errorMessages.properties), at
   * the time of class loading and we can get the property value based for
   * specific key by calling getValue(key) method.
   */

  // THIS BLOCK WILL WORK ONLY FOR READING THE property FILE FROM CLASS PATH
  static {
    try {
      properties = new Properties();
      InputStream in = Thread.currentThread().getContextClassLoader().getResourceAsStream("messages.properties");
      properties.load(in);
      logger.info("properties loaded :");

    } catch (Exception e) {
      logger.info("Error while loading properties..." + e);
    }
  }

  /**
   * Get the key value from the available properties.
   * 
   * @param key
   * @param dynamicValues
   * @return
   */
  public static String getValue(String key, String... dynamicValues) {
    if (properties != null) {
      if (dynamicValues != null && dynamicValues.length > 0) {
        return formatMessage(properties.getProperty(key), dynamicValues);
      } else {
        return properties.getProperty(key);
      }
    } else {
      return null;
    }
  }

  private static String formatMessage(String message, Object[] dynamicValues) {
    MessageFormat messageFormat = new MessageFormat(message);
    return messageFormat.format(dynamicValues);
  }

}
