package com.loan.util;

import java.util.Date;
import java.util.Map;

import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

import com.loan.data.entity.Changed;
import com.loan.data.entity.Created;


public class AuditListener {
  public static final String DEFAULT_USERNAME = "-1";

  private static ThreadLocal<Map<String, Object>> USER =
      new ThreadLocal<Map<String, Object>>();

  public static void clearAuditUsername() {
    USER.remove();
  }

  public static void setAuditUserDetail(Map<String, Object> user) {
    USER.set(user);
  }

  @PrePersist
  public void doCreate(Object po) {
    String userId = getLoggedUserId();

    if (po instanceof Created) {
      if (((Created) po).getCreatedBy() == null) {
        ((Created) po).setCreatedBy(userId);
      }
      if (((Created) po).getCreatedDate() == null) {
        ((Created) po).setCreatedDate(new Date());
      }
    }
    if (po instanceof Changed) {
      if (((Changed) po).getLastChangedDate() == null) {
        ((Changed) po).setLastChangedDate(new Date());
      }
      if (((Changed) po).getLastChangedBy() == null) {
        ((Changed) po).setLastChangedBy(userId);
      }
    }
  }

  @PreUpdate
  public void doUpdate(Object po) {
    if (po instanceof Changed) {
      String userId = getLoggedUserId();
      ((Changed) po).setLastChangedDate(new Date());
      ((Changed) po).setLastChangedBy(userId);
    }
  }

  public static String getLoggedUserId() {
    return (String) (USER.get() == null ? DEFAULT_USERNAME
        : USER.get().get("EMP_HRMS_ID").toString()); // TODO need to modify
  }
}
