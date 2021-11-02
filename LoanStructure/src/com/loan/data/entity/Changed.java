package com.loan.data.entity;

import java.util.Date; 

/**
 * Interface for objects supporting a create user and date This can be used by
 * interceptors to automatically fill in change information.
 * 
 */
public interface Changed {

  public Date getLastChangedDate();

  public void setLastChangedDate(Date lastChangedDate);

  public String getLastChangedBy();

  public void setLastChangedBy(String lastChangedBy);

}