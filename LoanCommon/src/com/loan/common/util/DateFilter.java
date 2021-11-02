package com.loan.common.util;

import java.io.Serializable;
import java.util.Date;



/**
 * @author Akashdeep Wadhwa
 * 
 * This is used for optional "From Date", "To Date" parameters to
 * further filter the query.
 * 
 */
public class DateFilter implements Serializable {

  private static final long serialVersionUID = 1L;

  private String paramName;

  private Date paramValue;

  private FilterMode filterMode;

  protected DateFilter() {
    
  }

  public DateFilter(String paramName, Date paramValue, FilterMode filterMode) {
    this.paramName = paramName;
    this.paramValue = paramValue;
    this.filterMode = filterMode;
  }

  /**
   * @return the paramName
   */
  public String getParamName() {
    return paramName;
  }

  /**
   * @param paramName
   *          the paramName to set
   */
  public void setParamName(String paramName) {
    this.paramName = paramName;
  }

  /**
   * @return the paramValue
   */
  public Date getParamValue() {
    return paramValue;
  }

  /**
   * @param paramValue
   *          the paramValue to set
   */
  public void setParamValue(Date paramValue) {
    this.paramValue = paramValue;
  }

  /**
   * @return the filterMode
   */
  public FilterMode getFilterMode() {
    return filterMode;
  }

  /**
   * @param filterMode
   *          the filterMode to set
   */
  public void setFilterMode(FilterMode filterMode) {
    this.filterMode = filterMode;
  }
}
