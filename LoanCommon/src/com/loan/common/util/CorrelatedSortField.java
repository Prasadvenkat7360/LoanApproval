package com.loan.common.util;

// Sort fields and filters should probably be combined
// and an efficient method for handing both at the same time
// dealt with - especially correlated - the outer join used
// to attach the values for querying could also have filters
// attached without using a subquery
public class CorrelatedSortField<X> extends SortField {

  private static final long serialVersionUID = 1L;

  private String fieldValue;

  private String joinPath;

  private String valuePath;

  public CorrelatedSortField(String fieldValue, String fieldPath, String valuePath, boolean ascending) {
    this.fieldValue = fieldValue;
    int dot = fieldPath.indexOf('.');
    if (dot <= 0) {
      throw new IllegalStateException(fieldPath + " must start with the join field and contain a .");
    }
    joinPath = fieldPath.substring(0, dot);
    setAscending(ascending);
    if (!valuePath.startsWith(fieldPath.substring(0, dot + 1))) {
      throw new IllegalStateException(fieldPath + " must start with the same join field as " + valuePath);
    }
    setFieldPath(fieldPath.substring(dot + 1));
    this.valuePath = valuePath.substring(dot + 1);

  }

  public CorrelatedSortField() {
  }

  public String getFieldValue() {
    return fieldValue;
  }

  public void setFieldValue(String fieldValue) {
    this.fieldValue = fieldValue;
  }

  public String getValuePath() {
    return valuePath;
  }

  public void setValuePath(String valuePath) {
    this.valuePath = valuePath;
  }

  public String getJoinPath() {
    return joinPath;
  }

  public void setJoinPath(String joinPath) {
    this.joinPath = joinPath;
  }

}
