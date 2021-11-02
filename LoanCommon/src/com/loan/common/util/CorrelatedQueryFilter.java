package com.loan.common.util;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

/**
 * Optional query parameters to further filter the query. This represents a
 * correlated subquery. namePath and valuePath should start with the same one to
 * many join attribute
 */
public class CorrelatedQueryFilter implements Serializable {

  private static final long serialVersionUID = 1L;

  private Map<String, Object> fieldFilters = new HashMap<String, Object>();

  private String joinField;

  private String namePath;

  private String valuePath;

  protected CorrelatedQueryFilter() {
  }

  public CorrelatedQueryFilter(String namePath, String valuePath) {
    int dot = namePath.indexOf('.');
    if (dot <= 0) {
      throw new IllegalStateException(namePath + " must start with the join field and contain a .");
    }
    this.joinField = namePath.substring(0, dot);
    if (!valuePath.startsWith(namePath.substring(0, dot + 1))) {
      throw new IllegalStateException(namePath + " must start with the same join field as " + valuePath);
    }
    this.namePath = namePath.substring(dot + 1);
    this.valuePath = valuePath.substring(dot + 1);
  }

  public void clear() {
    fieldFilters = new HashMap<String, Object>();
  }

  public Map<String, Object> getFieldFilters() {
    return fieldFilters;
  }

  public String getNamePath() {
    return namePath;
  }

  public String getValuePath() {
    return valuePath;
  }

  public String getJoinField() {
    return joinField;
  }

  public void setFieldFilter(String string, Object id) {
    fieldFilters.put(string, id);
  }

}
