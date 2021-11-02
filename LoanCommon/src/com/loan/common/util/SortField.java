package com.loan.common.util;

import java.io.Serializable;

public class SortField implements Serializable {

  private static final long serialVersionUID = 1L;
  private boolean ascending = true;
  private String fieldPath;

  public SortField(String fieldPath, boolean ascending) {
    this.fieldPath = fieldPath;
    this.ascending = ascending;
  }

  public SortField() {
  }

  public boolean isAscending() {
    return ascending;
  }

  // Do we need setters? Breaks mutability
  public void setAscending(boolean ascending) {
    this.ascending = ascending;
  }

  public String getFieldPath() {
    return fieldPath;
  }

  public void setFieldPath(String fieldPath) {
    this.fieldPath = fieldPath;
  }

}
