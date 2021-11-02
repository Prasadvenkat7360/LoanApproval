package com.loan.data.dto;

import java.util.Collections;
import java.util.List;

public class SortingDTO {


  public static List<DataDTO> getsortingvalues(List<DataDTO> slist,
      String sortType, Boolean enumtype) {
    if ("id".equalsIgnoreCase(sortType) && enumtype.TRUE) {
      Collections.sort(slist, (o1, o2) -> o1.getId().compareTo(o2.getId()));

    }

    else if ("id".equalsIgnoreCase(sortType) && enumtype.FALSE) {
      Collections.sort(slist, (o1, o2) -> Integer.parseInt(o1.getId())
          - Integer.parseInt(o2.getId()));
    }
    else if ("name".equalsIgnoreCase(sortType) && enumtype.TRUE) {
      Collections.sort(slist, (o1, o2) -> o1.getName().compareTo(o2.getName()));
    }
    else if ("name".equalsIgnoreCase(sortType) && enumtype.FALSE) {
      Collections.sort(slist, (o1, o2) -> o1.getName().compareTo(o2.getName()));
    }
    else if ("description".equalsIgnoreCase(sortType) && enumtype.equals(Boolean.FALSE)) {
      Collections.sort(slist, (o1, o2) -> o1.getDescription().compareTo(o2.getDescription()));
    }

    return slist;


  }



}
