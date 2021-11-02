
package com.loan.common.util;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * Optional query parameters to further filter the query.
 */
public class QueryFilter implements Serializable {

  private static final long serialVersionUID = 1L;

  // pagination page size
  private int offset;

  // item per page
  private int maxResults = Constants.PAGE_SIZE;

  // sorting by acending or decending
  private List<SortField> sortFields = new ArrayList<SortField>();

  // sorting by id, name....
  private Map<String, Object> sortingFields = new HashMap<String, Object>();

  // like operator
  private boolean useLike = true;

  // and operator
  private boolean andOperator = true;

  // distinct search
  private boolean isDistinct = false;

  // data coming from UI are store here
  private Map<String, Object> fieldFilters = new HashMap<String, Object>();

  // for adding condition for IS NOT NULL
  private Map<String, Object> notNullFilters = new HashMap<String, Object>();

  // for adding condition for IS NULL
  private Map<String, Object> nullFilters = new HashMap<String, Object>();

  // for sql joins..
  private Map<String, Object> joinFilters = new HashMap<String, Object>();

  // for or operator
  private List<Map<String, Object>> orFilters = new ArrayList<>();

  // for in operator
  private Map<String, List<Object>> inFilters =
      new HashMap<String, List<Object>>();

  // exclude a something from search
  private Map<String, Object> excludeFieldFilters =
      new HashMap<String, Object>();

  //
  private List<CorrelatedQueryFilter> correlatedFilters =
      new ArrayList<CorrelatedQueryFilter>();

  // freetext paths.....??????
  private String freeText;

  // freetext paths.....??????
  private String[] freeTextPaths;


  //
  private List<DateFilter> dateFilters = new ArrayList<DateFilter>();

  public void clear() {
    fieldFilters = new HashMap<String, Object>();
    excludeFieldFilters = new HashMap<String, Object>();
    offset = 0;
    sortFields.clear();
    correlatedFilters.clear();
    joinFilters = new HashMap<String, Object>();
    sortingFields = new HashMap<String, Object>();
    orFilters = new ArrayList<>();
    nullFilters = new HashMap<String, Object>();
    notNullFilters = new HashMap<String, Object>();
  }

  public int getOffset() {
    return offset;
  }

  public void setOffset(int firstResults) {
    this.offset = firstResults;
  }

  public void addSortField(String fieldPath, boolean ascending) {
    addSortField(new SortField(fieldPath, ascending));
  }

  public void addSortField(SortField sortField) {
    Iterator<SortField> i = sortFields.iterator();
    while (i.hasNext()) {
      SortField oldField = i.next();
      if (oldField.getFieldPath().equals(sortField.getFieldPath())) {
        i.remove(); // Could break, here because should only appear
                    // once, but
                    // lets be sure no one messed it up
      }
    }
    // Newest sort goes at the beginning
    sortFields.add(sortField);
  }

  public List<SortField> getSortFields() {
    return new ArrayList<SortField>(sortFields);
  }

  public int getMaxResults() {
    return maxResults;
  }

  public void setMaxResults(int maxResults) {
    this.maxResults = maxResults;
  }

  public Map<String, Object> getFieldFilters() {
    return fieldFilters;
  }

  public Map<String, Object> getExcludeFieldFilters() {
    return excludeFieldFilters;
  }

  public boolean isUseLike() {
    return useLike;
  }

  public void setUseLike(boolean useLike) {
    this.useLike = useLike;
  }

  public boolean isDistinct() {
    return isDistinct;
  }

  public void setDistinct(boolean isDistinct) {
    this.isDistinct = isDistinct;
  }

  public boolean isAndOperator() {
    return andOperator;
  }

  public void setAndOperator(boolean andOperator) {
    this.andOperator = andOperator;
  }

  public List<CorrelatedQueryFilter> getCorrelatedFilters() {
    return correlatedFilters;
  }

  /**
   * Will combine filters with the same join field
   * 
   * @param correlatedFilter
   */
  public void addCorrelatedFilter(CorrelatedQueryFilter correlatedFilter) {
    this.correlatedFilters.add(correlatedFilter);
  }

  public void setFieldFilter(String string, Object id) {
    if (useLike && id instanceof String) {
      StringBuilder sb = new StringBuilder("%");
      sb.append(id);
      sb.append("%");
      fieldFilters.put(string, sb.toString());
    }
    else {
      fieldFilters.put(string, id);
    }
  }

  public void setNullFilter(String string, Object data) {
    this.nullFilters.put(string, data);
  }

  public void setNotNullFilter(String string, Object data) {
    this.notNullFilters.put(string, data);
  }

  public void setExcludeFieldFilter(String string, Object id) {
    excludeFieldFilters.put(string, id);
  }

  /**
   * Will be used as a free text filter, or'd across multiple columns The
   * columns are defined depending on what is being searched
   * 
   * @return
   */
  public String getFreeText() {
    return freeText;
  }

  public void setFreeText(String freeText) {
    this.freeText = freeText;
  }

  /**
   * Paths to apply free text too. Really should be set on server.
   * 
   * @return
   */
  public String[] getFreeTextPaths() {
    return freeTextPaths;
  }

  public void setFreeTextPaths(String... freeTextPaths) {
    this.freeTextPaths = freeTextPaths;
  }

  public List<DateFilter> getDateFilters() {
    return dateFilters;
  }

  public void addDateFilter(DateFilter dateFilter) {
    this.dateFilters.add(dateFilter);
  }

  public Map<String, Object> getJoinFilters() {
    return joinFilters;
  }

  public void setJoinFilters(Map<String, Object> joinFilters) {
    this.joinFilters = joinFilters;
  }

  public Map<String, Object> getSortingFields() {
    return sortingFields;
  }

  public void setSortingFields(Map<String, Object> sortingFields) {
    this.sortingFields = sortingFields;
  }

  public List<Map<String, Object>> getOrFilters() {
    return orFilters;
  }

  public void setOrFilters(List<Map<String, Object>> orFilters) {
    this.orFilters = orFilters;
  }

  public Map<String, List<Object>> getInFilters() {
    return inFilters;
  }

  public void setInFilters(Map<String, List<Object>> inFilters) {
    this.inFilters = inFilters;
  }

  public Map<String, Object> getNotNullFilters() {
    return notNullFilters;
  }

  public void setNotNullFilters(Map<String, Object> notNullFilters) {
    this.notNullFilters = notNullFilters;
  }

  public Map<String, Object> getNullFilters() {
    return nullFilters;
  }

  public void setNullFilters(Map<String, Object> nullFilters) {
    this.nullFilters = nullFilters;
  }

}
