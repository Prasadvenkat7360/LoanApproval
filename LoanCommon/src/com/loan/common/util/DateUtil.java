package com.loan.common.util;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.Format;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;
import java.util.concurrent.TimeUnit;

import org.joda.time.DateTime;
import org.joda.time.Days;
import org.joda.time.Months;

public class DateUtil {

  private static Date addDays(final Date date, final int days) {
    final Calendar cal = Calendar.getInstance();
    cal.setTime(date);
    cal.add(Calendar.DATE, days); // minus number would decrement the days
    return cal.getTime();
  }

  public static void main(final String[] args) {

    String dateStart = "01/14/2014 00:00:00";
    String dateStop = "01/14/2011 00:00:00";
    String date = "01/14/2014 00:00:00";

    // HH converts hour in 24 hours format (0-23), day calculation
    SimpleDateFormat format = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");

    Date d1 = null;
    Date d2 = null;
    Date d3 = null;

    try {
      d1 = format.parse(dateStart);
      d2 = format.parse(dateStop);
      d3 = format.parse(date);
      System.out.println(d1);
      System.out.println(d2);
      System.out.println(d3);
      System.out.println(DateUtil.calculateDateExpByRange(d1, null, d3));
      // in milliseconds
      long diff = d2.getTime() - d1.getTime();

      long diffSeconds = diff / 1000 % 60;
      long diffMinutes = diff / (60 * 1000) % 60;
      long diffHours = diff / (60 * 60 * 1000) % 24;
      long diffDays = diff / (24 * 60 * 60 * 1000);
    }
    catch (Exception e) {
      e.printStackTrace();
    }

  }


  /**
   * To calculate the Date is exists with the range given or not
   * 
   * @author mayadhar
   * @param fromDate
   * @param toDate
   * @param selectedDate
   * @return boolean
   */
  public static boolean calculateDateExpByRange(Date fromDate, Date toDate,
      final Date selectedDate) {
    try {
      Date fromD = null;
      Date toD = null;
      Date selectedD = null;
      if (selectedDate == null) {
        return false;
      }
      if (fromDate == null && toDate == null) {
        return true;
      }

      if (fromDate != null) {
        fromD = DateUtil.conveterStringToDate(
            DateUtil.formatDate(fromDate, "dd/MM/yyyy"), "dd/MM/yyyy");
      }
      if (toDate != null) {
        toD = DateUtil.conveterStringToDate(
            DateUtil.formatDate(toDate, "dd/MM/yyyy"), "dd/MM/yyyy");
      }

      selectedD = DateUtil.conveterStringToDate(
          DateUtil.formatDate(selectedDate, "dd/MM/yyyy"), "dd/MM/yyyy");

      if (fromD != null && toD != null && fromD.compareTo(toD) > 0) {
        Date temp = fromD;
        fromD = toD;
        toD = temp;
        temp = null;
      }

      if ((fromD != null && selectedD.compareTo(fromD) >= 0 && toD == null)) {
        return true;
      }
      else if ((fromD != null && selectedD.compareTo(fromD) < 0
          && toD == null)) {
        return false;
      }
      else if ((toD != null && selectedD.compareTo(toD) <= 0
          && fromD == null)) {
        return true;
      }
      else if ((toD != null && selectedD.compareTo(toD) > 0 && fromD == null)) {
        return false;
      }

      if (selectedD.compareTo(fromD) * selectedD.compareTo(toD) <= 0) {
        return true;// with in range
      }
    }
    catch (final Exception e) {
      e.printStackTrace();
    }
    return false;
  }



  /**
   * To calculate the Date is expired or not.
   *
   * @param expiryDate
   * @return boolean
   */
  public static boolean calculateDateExpiry(final Date expiryDate) {
    boolean isExpired = false;
    try {
      final Date expDate = DateUtil.conveterStringToDate(
          DateUtil.formatDate(expiryDate, "dd/MM/yyyy"), "dd/MM/yyyy");
      final Date sysDate = DateUtil.conveterStringToDate(
          DateUtil.formatDate(DateUtil.getSystemDate(), "dd/MM/yyyy"),
          "dd/MM/yyyy");

      if (sysDate.compareTo(expDate) == 0 || sysDate.compareTo(expDate) < 0) {
        isExpired = false;// not expired
      }
      else {
        isExpired = true;// expired
      }
    }
    catch (final Exception e) {
      e.printStackTrace();
    }
    return isExpired;
  }

  /**
   * Convert String to Util Date Object with last minute of the Day
   *
   * @param date intput value
   * @return Date
   * @throws Exception
   */
  public static Date conveterSTDByAddingTime(final String date)
      throws Exception {
    final SimpleDateFormat formatter =
        new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

    // setting GMT Time zone
    final TimeZone timeZone = TimeZone.getTimeZone("GMT");
    formatter.setTimeZone(timeZone);

    final Date dateLoc = formatter.parse(date);

    final Calendar cal = Calendar.getInstance();
    cal.setTime(dateLoc);
    cal.add(Calendar.HOUR_OF_DAY, 23);
    cal.add(Calendar.MINUTE, 59);
    cal.add(Calendar.SECOND, 59);

    return cal.getTime();
  }

  /**
   * Convert String to Util Date Object with last minute of the Day
   *
   * @param date intput value
   * @return Date
   * @throws Exception
   */
  public static Date conveterSTDByAddingTime(final String date,
      final String format) throws Exception {
    final SimpleDateFormat formatter = new SimpleDateFormat(format);

    // setting GMT Time zone
    /*
     * final TimeZone timeZone = TimeZone.getTimeZone("GMT");
     * formatter.setTimeZone(timeZone);
     */

    final Date dateLoc = formatter.parse(date);

    final Calendar cal = Calendar.getInstance();
    cal.setTime(dateLoc);
    cal.add(Calendar.HOUR_OF_DAY, 23);
    cal.add(Calendar.MINUTE, 59);
    cal.add(Calendar.SECOND, 59);

    return cal.getTime();
  }

  /**
   * Convert String to Util Date Object
   *
   * @param date intput value
   * @return Date
   * @throws Exception
   */
  public static Date conveterStringToDate(final String date) throws Exception {
    final SimpleDateFormat formatter =
        new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

    // setting GMT Time zone
    final TimeZone timeZone = TimeZone.getTimeZone("GMT");
    formatter.setTimeZone(timeZone);

    final Date dateLoc = formatter.parse(date);
    return dateLoc;
  }

  /**
   * Convert String to Util Date Object
   *
   * @param date intput value
   * @return Date
   * @throws Exception
   */
  public static Date conveterStringToDate(final String date,
      final String format) throws Exception {
    final SimpleDateFormat formatter = new SimpleDateFormat(format);

    // setting GMT Time zone
    /*
     * final TimeZone timeZone = TimeZone.getTimeZone("GMT");
     * formatter.setTimeZone(timeZone);
     */

    final Date dateLoc = formatter.parse(date);
    return dateLoc;
  }

  /**
   * Returns the string form of date in the "dd-MMM-yyyy " format.
   *
   * @param date a source date object
   * @return string form of date
   */
  public static String formatDate(final Date date) {
    String formattedDate = "";
    final Format formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss aa");
    if (date != null) {
      formattedDate = formatter.format(date).toString();
    }
    return formattedDate;
  }

  public static String formatDate(final String string_date) {
    long milliseconds = 0;

    SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
    try {
      Date d = f.parse(string_date);
      milliseconds = d.getTime();
    }
    catch (Exception e) {
      e.printStackTrace();
    }

    Date date = new Date(milliseconds);
    SimpleDateFormat df2 = new SimpleDateFormat("dd-MM-yyyy");
    String dateText = df2.format(date);
    return dateText;
  }

  public static String formatDate(final Date date, final String format) {
    String formattedDate = "";
    final Format formatter = new SimpleDateFormat(format);
    if (date != null) {
      formattedDate = formatter.format(date).toString();
    }
    return formattedDate;
  }

  public static String formatDateToString(final Date date) {
    String formattedDate = "";
    final Format formatter = new SimpleDateFormat("dd/MM/yyyy");
    if (date != null) {
      formattedDate = formatter.format(date).toString();
    }
    return formattedDate;
  }

  public static String formatDateToStringYYYYMMDD(final Date date) {
    String formattedDate = "";
    final Format formatter = new SimpleDateFormat("YYYY-MM-DD");
    if (date != null) {
      formattedDate = formatter.format(date).toString();
    }
    return formattedDate;
  }

  public static Date formatStringToDate(final String strDate)
      throws ParseException {
    Date formattedDate = null;
    final SimpleDateFormat formatter =
        new SimpleDateFormat("dd-MM-yyyy HH:mm:ss aa");
    if (strDate != null) {
      formattedDate = formatter.parse(strDate);
    }
    return formattedDate;
  }

  public static Date formatStringToDateDDMMYYYY(final String strDate)
      throws ParseException {
    Date formattedDate = null;
    final SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
    if (strDate != null) {
      formattedDate = formatter.parse(strDate);
    }
    return formattedDate;
  }

  public static long getDateDuration(final Date startDate, final Date endDate) {
    final DateTime dt1 = new DateTime(startDate);
    final DateTime dt2 = new DateTime(endDate);
    return Days.daysBetween(dt1, dt2).getDays();

  }

  /**
   * To calculate the vendor Due date to be 30 % prior to customer due date
   *
   * @param endDate
   * @return Date
   */
  public static String getDatePercentage(final Date endDate) {
    final Date currentDate = getSystemDate();
    Date actualDate = null;
    if (endDate != null) {
      final int diffInDays = (int) ((endDate.getTime() - currentDate.getTime())
          / (1000 * 60 * 60 * 24));
      int perNumber;
      // difference of days to calculate the percentage
      // 30% = 0.3
      final float num = (float) ((diffInDays * 0.3));
      perNumber = Math.round(num);
      actualDate = addDays(endDate, -perNumber);
      if (currentDate.after(endDate) || currentDate.equals(endDate)) {
        actualDate = currentDate;
      }
    }
    return formatDate(actualDate, "dd/MM/yyyy");
  }

  public static Date getEndOfDay() {
    final Calendar calendar = Calendar.getInstance();
    final int year = calendar.get(Calendar.YEAR);
    final int month = calendar.get(Calendar.MONTH);
    final int day = calendar.get(Calendar.DATE);
    calendar.set(year, month, day, 23, 59, 59);
    return calendar.getTime();
  }

  public static Date getStartOfDay() {
    final Calendar calendar = Calendar.getInstance();
    final int year = calendar.get(Calendar.YEAR);
    final int month = calendar.get(Calendar.MONTH);
    final int day = calendar.get(Calendar.DATE);
    calendar.set(year, month, day, 0, 0, 0);
    return calendar.getTime();
  }

  public static java.sql.Date getStringToOracleDate(final String date,
      final String format) {

    if (date != null && date.length() > 0) {
      try {
        final Date d = new SimpleDateFormat(format).parse(date);

        final java.sql.Date sqlDate = new java.sql.Date(d.getTime());

        return sqlDate;
      }
      catch (final Exception ex) {
        ex.printStackTrace();
      }
    }
    return null;

  }

  public static Date getSysDateBySpecicFormat(final String format)
      throws ParseException {
    final DateFormat dateFormat = new SimpleDateFormat(format);
    final Date date = new Date();
    dateFormat.format(date); // get system date in string format
    return dateFormat.parse(dateFormat.format(date)); // converting date
    // from
    // String to Date object
  }

  public static Date getSystemDate() {

    final java.util.Date date = new java.util.Date();
    return date;

  }

  public static Timestamp getSystemTimestamp() {

    final java.util.Date date = new java.util.Date();
    return new Timestamp(date.getTime());

  }

  public static Timestamp getTimestampByDate(Date date) {

    return new Timestamp(date.getTime());

  }

  public static String getSystemTimeStamp() {

    final String currDate =
        new SimpleDateFormat("ddMMyyyyHHmmss").format(new Date());

    return currDate;

  }

  /*
   * public static Date getSystemTimestamp() throws ParseException {
   * SimpleDateFormat format = new SimpleDateFormat("MM/dd/yyyy");
   * java.util.Date date = new java.util.Date(); String strDate =
   * format.format(date); format.format(date); return format.parse(strDate); }
   */

  void doIt() {

    final DateFormat format = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss aa");
    final Calendar calendar = Calendar.getInstance();

    // calendar.set (Calendar.HOUR_OF_DAY, 0);

    calendar.set(Calendar.HOUR_OF_DAY, 12);

    calendar.set(Calendar.HOUR, 0);
    calendar.set(Calendar.AM_PM, Calendar.AM);

    calendar.set(Calendar.AM_PM, Calendar.PM);
  }

  public static long getDifferenceDays(Date d1, Date d2) {
    // Setting time as Zero
    Calendar cal = Calendar.getInstance();
    cal.setTime(d1);
    cal.set(Calendar.HOUR_OF_DAY, 0);
    cal.set(Calendar.MINUTE, 0);
    cal.set(Calendar.SECOND, 0);
    cal.set(Calendar.MILLISECOND, 0);
    d1 = cal.getTime();

    cal.setTime(d2);
    cal.set(Calendar.HOUR_OF_DAY, 0);
    cal.set(Calendar.MINUTE, 0);
    cal.set(Calendar.SECOND, 0);
    cal.set(Calendar.MILLISECOND, 0);
    d2 = cal.getTime();

    long diff = d2.getTime() - d1.getTime();
    return TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS);
  }

  public static long getMonthDuration(final Date startDate,
      final Date endDate) {
    final DateTime dt1 = new DateTime(startDate);
    final DateTime dt2 = new DateTime(endDate);
    return Months.monthsBetween(dt1, dt2).getMonths();
  }

  /***
   * @author shreevardhan.t
   * 
   * @param date : Date in string format
   * @param format : The format in which the date is in. (example : dd/MM/yyyy
   *        HH:mm:ss)
   * @return : Formatted date
   * @throws ParseException
   */
  public static Date formatStringToDate(final String date, String format)
      throws ParseException {
    Date formattedDate = null;
    final SimpleDateFormat formatter = new SimpleDateFormat(format);
    if (date != null) {
      formattedDate = formatter.parse(date);
    }
    return formattedDate;
  }

  public static int getNumberOfDays(final int year, int month) {
    int days = 0;
    Calendar calendar = Calendar.getInstance();
    calendar.set(Calendar.YEAR, year);
    calendar.set(Calendar.MONTH, month);
    days = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
    return days;
  }

  public static String getMonth(int month) {

    String mName = null;
    switch (month) {
      case 0:
        mName = "Jan";
        break;
      case 1:
        mName = "Feb";
        break;
      case 2:
        mName = "Mar";
        break;
      case 3:
        mName = "Apr";
        break;
      case 4:
        mName = "May";
        break;
      case 5:
        mName = "Jun";
        break;
      case 6:
        mName = "Jul";
        break;
      case 7:
        mName = "Aug";
        break;
      case 8:
        mName = "Sep";
        break;
      case 9:
        mName = "Oct";
        break;
      case 10:
        mName = "Nov";
        break;
      case 11:
        mName = "Dec";
        break;
      default:
        mName = "Invalid month";
        break;
    }



    return mName;



  }

}
