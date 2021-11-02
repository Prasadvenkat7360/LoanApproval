package com.loan.data.entity;

import java.util.Date;

/**
 * Interface for objects supporting a create user and date This can be used by
 * interceptors to automatically fill in creation information.
 * 
 */
public interface Created {

  public Date getCreatedDate();

  public void setCreatedDate(Date createdDate);

  public String getCreatedBy();

  public void setCreatedBy(String createdBy);

}