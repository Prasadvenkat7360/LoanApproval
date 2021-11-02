package com.loan.data.types;

import java.util.HashMap;
import java.util.Map;

public enum EmployeeType {
  AGENT("Agent"), CUST("Customer"), MAST("Master");

  public static Map<String, String> getAllTypes() {
    return allTypes;
  }

  public static EmployeeType valueOfKey(final String value) {
    for (final EmployeeType t : values()) {
      if (t.name().equals(value)) {
        return t;
      }
    }
    return null;
  }

  public static EmployeeType valueOfName(final String value) {
    for (final EmployeeType t : values()) {
      if (t.getType().equals(value)) {
        return t;
      }
    }
    return null;
  }

  private String type;

  private static Map<String, String> allTypes = new HashMap<String, String>();

  static {
    for (final EmployeeType t : values()) {
      allTypes.put(t.name(), t.getType());
    }
  }

  private EmployeeType(final String type) {
    this.type = type;
  }

  public String getType() {
    return this.type;
  }



}
