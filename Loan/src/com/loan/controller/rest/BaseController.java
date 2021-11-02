package com.loan.controller.rest;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;

import com.loan.common.exception.BusinessServiceException;
import com.loan.common.exception.OECode;
import com.loan.common.exception.SalesCode;
import com.loan.common.util.Constants;
import com.loan.common.util.DateFilter;
import com.loan.common.util.DateUtil;
import com.loan.common.util.FilterMode;
import com.loan.common.util.QueryFilter;
import com.loan.common.util.ResourceUtil;
import com.loan.common.util.SortField;
import com.loan.common.util.UseLike;
import com.loan.data.dto.MapDTO;

public class BaseController {

  protected static String rootPath;

  protected static QueryFilter dateFilter(final QueryFilter f, final Date value,
      final FilterMode filterMode, final String... keys) {

    final int length = keys.length;

    for (int i = 0; i < length; i++) {
      final DateFilter dateFilter = new DateFilter(keys[i], value, filterMode);

      f.addDateFilter(dateFilter);

    }
    return f;
  }

  // add same value to given keys
  protected static QueryFilter modifyFilter(final QueryFilter f,
      final Object value, final String... keys) {

    final int length = keys.length;
    for (int i = 0; i < length; i++) {
      f.getFieldFilters().put(keys[i], value);
    }
    return f;
  }

  /**
   * UI Sort Key mapping with entity key
   * 
   * @param filter
   * @param filedMap
   */
  protected void updateSortWithEntityField(final QueryFilter filter,
      Map<String, String> filedMap) {

    if (null != filter.getSortingFields() && filedMap != null) {
      final List<String> sortedList =
          new ArrayList<>(filter.getSortingFields().keySet());
      String sortingOn = "";
      SortField sortField;
      for (final String st : sortedList) {
        if (filedMap.containsKey(st)) {
          sortingOn = filedMap.get(st);

          sortField = new SortField(sortingOn,
              (boolean) filter.getSortingFields().get(st));

          filter.addSortField(sortField);
        }
      }
    }
  }

  /**
   * UI filter key mapping with entity key for date
   * 
   * @param filter
   * @param filedMap
   */
  protected void updateDateFilterWithEntityField(final QueryFilter filter,
      Map<String, Object[]> filedMap) {
    if (filter != null && filedMap != null) {
      final Map<String, Object> fieldFilter = filter.getFieldFilters();
      List<String> list = new ArrayList<String>(fieldFilter.keySet());
      list.stream().forEach(key -> {
        try {
          if (filedMap.containsKey(key)) {
            dateFilter(filter,
                DateUtil.conveterStringToDate((String) fieldFilter.get(key),
                    Constants.DATE_FORMAT_DDMMYYYY),
                (FilterMode) filedMap.get(key)[1],
                (String) filedMap.get(key)[0]);
            filter.getFieldFilters().remove(key);
          }
        }
        catch (final Exception e) {
          throw new BusinessServiceException(SalesCode.INVALID_DATEFORMAT);
        }
      });
    }
  }

  /**
   * UI filter key mapping with entity key
   * 
   * @param filter
   * @param filedMap
   */
  protected void updateFilterWithEntityField(final QueryFilter filter,
      Map<String, String> filedMap) {
    if (filter != null && filedMap != null) {
      final Map<String, Object> fieldFilter = filter.getFieldFilters();
      List<String> list = new ArrayList<String>(fieldFilter.keySet());

      list.stream().forEach(key -> {
        if (filedMap.containsKey(key)) {
          modifyFilter(filter, fieldFilter.get(key), filedMap.get(key));
          filter.getFieldFilters().remove(key);
        }
      });

      // for wild card searches
      if (filter.isUseLike()) {
        // if it is use like, prefix & suffix with % to value
        list = new ArrayList<String>(fieldFilter.keySet());
        list.stream().forEach(key -> filter.getFieldFilters().put(key,
            UseLike.convertUseLike(fieldFilter.get(key))));
      }
    }
  }

  /**
   * adding same value to orFilters list to construct or condition between
   * fields
   * 
   * @param f of QueryFilter
   * @param value of Object
   * @param keys of String array
   * @return QueryFilter
   */
  protected static QueryFilter orFilter(final QueryFilter f, final Object value,
      final String... keys) {
    final Map<String, Object> map = new HashMap<String, Object>();
    final int length = keys.length;
    for (int i = 0; i < length; i++) {
      map.put(keys[i], value);
    }
    f.getOrFilters().add(map);
    return f;
  }


  /**
   * adding same Column to orFilters list to construct or condition between
   * different data
   * 
   * @param f of QueryFilter
   * @param value of Object
   * @param keys of String array
   * @return QueryFilter
   */
  protected static QueryFilter orFilterOnSameColumn(final QueryFilter f,
      final Object value, final String... keys) {
    final Map<String, Object> map = new HashMap<String, Object>();
    final int length = keys.length;
    for (int i = 0; i < length; i++) {
      map.put(value.toString(), keys[i]);
    }
    f.getOrFilters().add(map);
    return f;
  }

  protected static QueryFilter inFilter(final QueryFilter f, final String key,
      List<Object> values) {
    f.getInFilters().put(key, values);
    return f;
  }

  public List<Integer> valueList(String s) {
    String[] str;
    List vList = null;
    if (s != "") {
      str = s.split(",");
      vList = new ArrayList<Integer>();
      for (String i : str) {
        int val = Integer.parseInt(i);
        vList.add(val);
      }
    }
    return vList;
  }

  public List<String> valueEnumList(String s) {
    String[] str;
    List vList = null;
    if (s != "") {
      str = s.split(",");
      vList = new ArrayList<Integer>();
      for (String i : str) {
        vList.add(i.trim());
      }
    }
    return vList;
  }

  // add same value to given keys
  protected static QueryFilter sortingFilter(final QueryFilter f,
      final Object value, final String... keys) {

    final int length = keys.length;
    for (int i = 0; i < length; i++) {
      final SortField sortField = new SortField(keys[i], (boolean) value);
      f.addSortField(sortField);
    }
    return f;
  }


  @Autowired
  Environment env;

  /**
   * This method set error messages and code to MapDto
   * 
   * @param mapDTO
   * @param object
   */
  protected void handleExceptions(final MapDTO mapDTO, final Object object) {
    if (object instanceof BusinessServiceException) {
      final BusinessServiceException bse = (BusinessServiceException) object;
      final String resCode = (bse.getErrorCode() != null) ? "2" : "3";
      mapDTO.setResCode(resCode);
      if ("2".equals(resCode)) {
        mapDTO.setMesgStr(this.env
            .getProperty(ResourceUtil.getPropertyKey(bse.getErrorCode())));
      }
      else {
        if (null != bse.getErrorMessages()
            && bse.getErrorMessages().size() > 0) {
          mapDTO.setMesgStr(bse.getErrorMessages().get(0));
        }
        else {
          mapDTO.setMesgStr(this.env
              .getProperty(ResourceUtil.getPropertyKey(bse.getErrorCode())));
        }
      }
    }
    else if (object instanceof Exception) {
      mapDTO.setResCode("3");
      mapDTO.setMesgStr(this.env
          .getProperty(ResourceUtil.getPropertyKey(OECode.CONTACT_ADMIN)));
    }
  }



}
