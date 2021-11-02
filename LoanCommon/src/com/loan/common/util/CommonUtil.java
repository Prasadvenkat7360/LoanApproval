package com.loan.common.util;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.math.MathContext;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.text.ParseException;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;
import java.util.function.IntFunction;
import java.util.function.Predicate;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.apache.commons.beanutils.BeanUtils;
import org.joda.time.DateTime;
import org.joda.time.Days;

import com.loan.common.exception.SalesCode;

public class CommonUtil {



  public static boolean validateUsingReg(final String format,
      final String data) {

    final Pattern pattern = Pattern.compile(format);
    return !pattern.matcher(data).matches();
  }

  public static BigDecimal nearestMultipleOf(BigDecimal originalNumber,
      int nearestMultipleOf) {
    if (nearestMultipleOf > 0)
      return new BigDecimal((nearestMultipleOf
          * (Math.round(originalNumber.doubleValue() / nearestMultipleOf))));
    else return originalNumber;
  }

  public static String getVendorDueDate(Date date, int vendorDueDate) {
    int diff = 0;
    try {

      DateTime dt1 = new DateTime(date);
      DateTime dt2 =
          new DateTime(DateUtil.getSysDateBySpecicFormat("dd-MM-yyyy"));

      diff = Days.daysBetween(dt2, dt1).getDays();
      if (diff > 2) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(DateUtil.getSysDateBySpecicFormat("dd-MM-yyyy"));
        cal.add(Calendar.DATE, (diff * vendorDueDate) / 100);
        return DateUtil.formatDateToString(cal.getTime());

      }
      else {
        return DateUtil.formatDateToString(date);
      }

    }
    catch (ParseException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
      return null;
    }
  }

  /**
   * @author manoranjan.mishra
   * @param bigdecimalValue,Take String As Argument
   * @return a BigdecimalValue this method take a String as argument and return
   *         a BigDecimal ,
   */
  public static BigDecimal getBigDecimal(String bigdecimalValue) {

    DecimalFormatSymbols symbols = new DecimalFormatSymbols();
    symbols.setGroupingSeparator(',');
    symbols.setDecimalSeparator('.');
    String pattern = "#,##0.0#";
    DecimalFormat decimalFormat = new DecimalFormat(pattern, symbols);
    decimalFormat.setParseBigDecimal(true);

    try {
      return (BigDecimal) decimalFormat.parse(bigdecimalValue);
    }
    catch (ParseException e) {
      return null;

    }

  }

  public static <T> T conVertToObjectType(T entity, T Entity1) {
    try {
      BeanUtils.copyProperties(entity, Entity1);
    }
    catch (IllegalAccessException | InvocationTargetException e) {

    }
    return Entity1;
  }

  /**
   * @author manoranjan.mishra
   * @param bigDecimal
   * @return double value of given BigDecimal Value
   * 
   *         This Method used to convert a Bigdecimal Value to double value
   */
  public static Double getDouble(BigDecimal bigDecimal) {
    return null != bigDecimal ? bigDecimal.doubleValue() : 0.0;
  }

  public static BigDecimal getBigDecimal(Double double1) {
    return null != double1 ? new BigDecimal(double1, MathContext.DECIMAL64)
        : BigDecimal.ZERO;
  }

  /**
   * 
   * @param value Long
   * @return value this method used to check long value is null or not
   * 
   */
  public static Long isNull(Long value) {
    if (null != value) {
      return value;
    }
    else {
      return new Long(0);
    }


  }


  /**
   * @author manoranjan.mishra
   * @param lower
   * @param upper
   * @return random number between two given parameter
   */
  public static Integer getRandomNumber(Integer lower, Integer upper) {
    Integer random = null;
    try {
      random = (int) (Math.random() * (upper - lower)) + lower;
    }
    catch (Exception e) {

    }
    return random;
  }


  public static String ConvertToBigDecimal(BigDecimal bvalue, int scale) {
    return (null != bvalue ? bvalue.setScale(scale, RoundingMode.FLOOR)
        : BigDecimal.ZERO.setScale(scale, RoundingMode.FLOOR)).toString();
  }

  /**
   * @author manoranjan.mishra
   * @param from
   * @param func
   * @return This Method used to convert List of String to specific object type
   *         {@code   List<Long> catids = CommonUtil.convertList(string, s -> Long.parseLong(s));}
   */
  public static <T, U> List<U> convertList(List<T> from, Function<T, U> func) {
    return from.stream().map(func).collect(Collectors.toList());
  }

  /**
   * 
   * @param from
   * @param func
   * @param generator
   * @return This Method used to covert String of array to generic List of
   *         object
   * 
   */
  public static <T, U> U[] convertArray(T[] from, Function<T, U> func,
      IntFunction<U[]> generator) {
    return Arrays.stream(from).map(func).toArray(generator);
  }

  /**
   * Function to replace null value with a given non null value
   * 
   * @param source - source value to check for null
   * @param alternativeValue - value to replace source if source is null (Note:
   *        alternativeValue value cannot be null)
   * @return - a non null value
   * 
   */

  public static <T> T replaceNull(T source, T alternativeValue) {
    return null != source ? source : alternativeValue;
  }

  /**
   * used to get the Distinct object
   * 
   * List<Person> personListFiltered = personList.stream()
   * .filter(distinctByKey(p -> p.getName())) .collect(Collectors.toList());
   * 
   * @param keyExtractor
   * @return
   */

  public static <T> Predicate<T> distinctByKey(
      Function<? super T, ?> keyExtractor) {
    Set<Object> seen = ConcurrentHashMap.newKeySet();
    return t -> seen.add(keyExtractor.apply(t));
  }

  /**
   * used to get the Distinct objects
   * 
   * List<Person> persons = listPersons.stream() //@Holger suggest
   * .filter(distinctByKey(pr -> Arrays.asList(pr.getId(), pr.getName())))
   * .collect(toList());
   * 
   * @param keyExtractor
   * @return
   */
  @SuppressWarnings("unused")
  public static <T> Predicate<T> distinctByKeys(
      Function<? super T, ?> keyExtractor) {
    Map<Object, Boolean> map = new ConcurrentHashMap<>();
    return t -> map.putIfAbsent(keyExtractor.apply(t), Boolean.TRUE) == null;
  }

  /**
   * Function to replace null value for multiple type variables of most class
   * object variables
   * 
   * Note: Use it with caution, unless its very necessary the there are tones of
   * variables to make non null, don't use this method. It uses reflection API,
   * which is very heavy weight
   * 
   */
  static void fillNullObjects(Object object) {
    Field[] fields = object.getClass().getDeclaredFields();
    for (Field field : fields) {
      try {
        field.setAccessible(true);
        if (field.get(object) != null) {
          continue;
        }
        else if (field.getType().equals(Integer.class)) {
          field.set(object, 0);
        }
        else if (field.getType().equals(String.class)) {
          field.set(object, "");
        }
        else if (field.getType().equals(Boolean.class)) {
          field.set(object, false);
        }
        else if (field.getType().equals(Character.class)) {
          field.set(object, '\u0000');
        }
        else if (field.getType().equals(Byte.class)) {
          field.set(object, (byte) 0);
        }
        else if (field.getType().equals(Float.class)) {
          field.set(object, 0.0f);
        }
        else if (field.getType().equals(Double.class)) {
          field.set(object, 0.0d);
        }
        else if (field.getType().equals(Short.class)) {
          field.set(object, (short) 0);
        }
        else if (field.getType().equals(Long.class)) {
          field.set(object, 0L);
        }
        else if (field.getType().equals(BigDecimal.class)) {
          field.set(object, BigDecimal.ZERO);
        }
        // Below lines are Not recommended as it will recursively keep creating
        // objects until leaf node is obtained
        // else if (field.getType().getDeclaredFields().length > 0) {
        // for (Constructor<?> constructor : field.getClass()
        // .getConstructors()) {
        // if (constructor.getParameterTypes().length == 0) {
        // field.set(object, constructor.newInstance());
        // fillNullObjects(field.get(object));
        // }
        // }
        // }

      }
      catch (IllegalAccessException e) {
        e.printStackTrace();
      }
    }
  }

  /**
   * This method used to Round Off with customized value
   * 
   * @author manoranjan.mishra
   * @param actualValue
   * @param round value
   * @return rounded Value
   */
  public static BigDecimal round(BigDecimal actualValue, int rvalue) {
    BigInteger absvalue =
        actualValue.setScale(0, RoundingMode.HALF_UP).toBigInteger();

    BigInteger smallMultiple = (absvalue.divide(BigInteger.valueOf(rvalue))
        .multiply(BigInteger.valueOf(rvalue)));

    // Larger multiple
    BigInteger largerMultiple = smallMultiple.add(BigInteger.valueOf(rvalue));

    // Return of closest of two
    if (1 == actualValue.subtract(new BigDecimal(smallMultiple))
        .compareTo(new BigDecimal(largerMultiple).subtract(actualValue))

        || 0 == actualValue.subtract(new BigDecimal(smallMultiple))
            .compareTo(new BigDecimal(largerMultiple).subtract(actualValue)))
      return new BigDecimal(largerMultiple);
    else return new BigDecimal(smallMultiple);


  }

  /**
   * This method used to convert cts(uom) to gms(Uom)
   * 
   * @param cts
   * @return
   */
  public static BigDecimal convertCtsToGms(BigDecimal cts) {
    return cts.multiply(new BigDecimal(0.2).setScale(6));
  }

  /**
   * this methos used to split the comma seperated values
   * 
   * @param str
   * @param String
   * @return
   */
  public static StringBuilder convertStringToCommaSeperated(String str,
      String type) {

    StringBuilder splitOutput = new StringBuilder();
    if (type.equals(Constants.COMMA_SEPERATED_WITH_SINGLE_QUOTES)) {
      String[] parts = str.split(",");
      for (String part : parts) {
        if (splitOutput.length() > 0) {
          splitOutput.append(",");
        }

        splitOutput.append("'").append(part).append("'");

      }


    }
    return splitOutput;
  }

  public static SalesCode getSalesBusinessException(String salesCode) {
    SalesCode salesBusinessException = null;

    if (salesCode
        .equalsIgnoreCase(SalesCode.ISSUE_LOYALTY_CARD_FAILURE.toString())) {
      salesBusinessException = SalesCode.ISSUE_LOYALTY_CARD_FAILURE;
    }
    if (salesCode.equalsIgnoreCase(
        SalesCode.NOT_ASSIGN_CUSTOMER_LOYALTY_FAILURE.toString())) {
      salesBusinessException = SalesCode.NOT_ASSIGN_CUSTOMER_LOYALTY_FAILURE;
    }
    if (salesCode.equalsIgnoreCase(SalesCode.LOYALTY_IN_ACTIVE.toString())) {
      salesBusinessException = SalesCode.LOYALTY_IN_ACTIVE;
    }
    if (salesCode
        .equalsIgnoreCase(SalesCode.INVALID_LOYALTY_CARD_NO.toString())) {
      salesBusinessException = SalesCode.INVALID_LOYALTY_CARD_NO;
    }
    return salesBusinessException;
  }

}
