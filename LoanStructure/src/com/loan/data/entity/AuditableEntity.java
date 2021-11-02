package com.loan.data.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

/**
 * Entity implementation class for Entity: AuditableEntity
 * 
 */
@MappedSuperclass
public abstract class AuditableEntity
    implements Serializable, Created, Changed {

  private static final long serialVersionUID = 1L;
  @Column(name = "CREATED_DATE", nullable = false)
  private Date createdDate;

  @Column(name = "CREATED_BY", length = 32, nullable = false)
  private String createdBy;

  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "LAST_CHANGED_DATE", nullable = true)
  private Date lastChangedDate;

  @Column(name = "LAST_CHANGED_BY", length = 32, nullable = true)
  private String lastChangedBy;

  @Transient
  private String creationDate;

  public Date getLastChangedDate() {
    return lastChangedDate;
  }

  public void setLastChangedDate(Date lastChangedDate) {
    this.lastChangedDate = lastChangedDate;
  }

  public String getLastChangedBy() {
    return lastChangedBy;
  }

  public void setLastChangedBy(String lastChangedBy) {
    this.lastChangedBy = lastChangedBy;
  }

  public Date getCreatedDate() {
    return createdDate;
  }

  public void setCreatedDate(Date createdDate) {
    this.createdDate = createdDate;
  }

  public String getCreatedBy() {
    return createdBy;
  }

  public void setCreatedBy(String createdBy) {
    this.createdBy = createdBy;
  }

  public String getCreationDate() {
    return creationDate;
  }

  public void setCreationDate(String creationDate) {
    this.creationDate = creationDate;
  }

}
