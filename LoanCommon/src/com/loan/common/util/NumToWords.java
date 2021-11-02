package com.loan.common.util;

public class NumToWords {

  public static String convert(long number) {
    int n = 1;
    Long word;
    string = "";
    while (number != 0) {
      switch (n) {
        case 1:
          word = number % 100;
          pass(word.intValue());
          if (number > 100 && number % 100 != 0) {
            show("and ");
          }
          number /= 100;
          break;
        case 2:
          word = number % 10;
          if (word != 0) {
            show(" ");
            show(st2[0]);
            show(" ");
            pass(word.intValue());
          }
          number /= 10;
          break;
        case 3:
          word = number % 100;
          if (word != 0) {
            show(" ");
            show(st2[1]);
            show(" ");
            pass(word.intValue());
          }
          number /= 100;
          break;
        case 4:
          word = number % 100;
          if (word != 0) {
            show(" ");
            show(st2[2]);
            show(" ");
            pass(word.intValue());
          }
          number /= 100;
          break;
        case 5:
          word = number % 100;
          if (word != 0) {
            show(" ");
            show(st2[3]);
            show(" ");
            pass(word.intValue());
          }
          number /= 100;
          break;
        case 6:
          word = number % 100;
          if (word != 0) {
            show(" ");
            show(st2[4]);
            show(" ");
            pass(word.intValue());
          }
          number /= 100;
          break;
      }

      n++;
    }
    return string;
  }

  public static void main(final String[] st) {

  }

  public static void pass(final int number) {
    int word, q;
    if (number < 10) {
      show(st1[number]);
    }
    if (number > 9 && number < 20) {
      show(st3[number - 10]);
    }
    if (number > 19) {
      word = number % 10;
      if (word == 0) {
        q = number / 10;
        show(st4[q - 2]);
      }
      else {
        q = number / 10;
        show(st1[word]);
        show(" ");
        show(st4[q - 2]);
      }
    }
  }

  public static String rupeesToWords(final String amt) {
    String words = "";
    final String[] numbers = amt.split("\\.");

    // int number = Integer.parseInt(numbers[0]);
    final long number = Long.parseLong(numbers[0]);
    String rupees = convert(number);

    // rupees += " ";
    if (numbers.length > 1 && Long.parseLong(numbers[1]) > 0) {
      final int paise = Integer.parseInt(numbers[1]);
      if (paise != 0) {
        words += " and ";
        words += convert(paise);
        words += " Paise";
      }

    }
    return "Rupees " + rupees + words + " Only";
  }

  public static void show(final String s) {
    String st;
    st = string;
    string = s;
    string += st;
  }


  static String string;

  static String st1[] = {"", "One", "Two", "Three", "Four", "Five", "Six",
      "Seven", "Eight", "Nine", "Ten"};

  static String st2[] = {"Hundred", "Thousand", "Lakh", "Crore", "Arab"};

  static String st3[] = {"Ten", "Eleven", "Twelve", "Thirteen", "Fourteen",
      "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Ninteen",};

  static String st4[] = {"Twenty", "Thirty", "Fourty", "Fifty", "Sixty",
      "Seventy", "Eighty", "Ninty"};
}
