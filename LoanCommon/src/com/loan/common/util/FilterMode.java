package com.loan.common.util;

public enum FilterMode {
  INCLUDE("I"), EXCLUDE("E"), TEXT("T"), FORMULA("F"), FromDate("From"), ToDate("To"), EQUAL("Eq");

  private String name;

  private FilterMode(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }
}
