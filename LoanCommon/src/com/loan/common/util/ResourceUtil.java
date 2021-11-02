package com.loan.common.util;

import com.loan.common.exception.ErrorCode;

public class ResourceUtil
{

  public static String getPropertyKey(ErrorCode errorCode)
  {
    if (errorCode == null) {
      return null;
    }
    String key = errorCode.getClass().getSimpleName() + "_" + errorCode;
    return key;
  }

}
