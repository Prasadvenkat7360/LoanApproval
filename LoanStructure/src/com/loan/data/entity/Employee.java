package com.loan.data.entity;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import com.loan.data.dto.MapDTO.EmployeeView;
import com.loan.data.dto.MapDTO.MapDTOView;
import com.loan.data.types.EmployeeType;
import com.loan.util.AuditListener;

/**
 * Entity implementation class for Entity: Employee
 *
 */
@Entity
@EntityListeners(value = AuditListener.class)
@Table(name = "EMPLOYEE_DETAILS",
    uniqueConstraints = {@UniqueConstraint(columnNames = {"EMP_HRMS_ID"})})
@NamedQueries({
    @NamedQuery(name = "Employee.authenticate",
        query = "SELECT o FROM Employee o where o.hrmsId = :hrmsId AND o.password = :pwd AND o.isActive = TRUE"),
    @NamedQuery(name = "Employee.authenticateByRole",
        query = "SELECT o FROM Employee o where o.hrmsId = :hrmsId AND o.password = :pwd AND o.isActive = TRUE  AND o.role.name = :roleName"),
    @NamedQuery(name = "Employee.EmployeeDetailsById",
        query = "SELECT o FROM Employee o where o.id = :ID"),
    @NamedQuery(name = "Employee.EmployeeDetailsByName",
        query = "SELECT o FROM Employee o where o.name = :name"),
    @NamedQuery(name = "Employee.EmployeeDetailsByHrmsId",
        query = "SELECT o FROM Employee o where o.hrmsId = :hrmsId"),
    @NamedQuery(name = "Employee.EmployeeListByHrmsId",
        query = "SELECT o FROM Employee o where o.hrmsId in :hrmsId"),
    @NamedQuery(name = "Employee.FindEmployeeForAll",
        query = "SELECT o FROM Employee o where 1 = 1")
})
public class Employee extends AuditableEntity {

  // interface for View
  public interface ResultView {
  }

  private static final long serialVersionUID = 1L;

  @Id
  @JsonView({MapDTOView.class})
  @GeneratedValue(strategy = GenerationType.SEQUENCE,
      generator = "employee_seq_id")
  @SequenceGenerator(name = "employee_seq_id", sequenceName = "EMPLOYEE_SEQ",
      allocationSize = 1, initialValue = 1)
  @Basic(optional = false)
  @Column(name = "EMP_ID")
  private long id;;

  @JsonView({MapDTOView.class})
  @Column(name = "EMP_NAME", length = 200, nullable = false)
  private String name;

  @JsonView({ResultView.class})
  @Column(name = "EMAIL", length = 200, nullable = true)
  private String email;

  @JsonView({MapDTOView.class})
  @Column(name = "EMP_HRMS_ID", nullable = false)
  private String hrmsId;

  @Column(name = "EMP_PASSWORD", length = 50, nullable = false)
  private String password;

  @Column(name = "IS_ACTIVE_FLAG", nullable = false)
  private Boolean isActive;

  @JsonView({MapDTOView.class})
  @Column(name = "MOBILE_NUMBER", length = 20, nullable = true)
  private Long mobile;

  @JsonIgnore
  @ManyToOne(cascade = {CascadeType.DETACH}, fetch = FetchType.LAZY,
      optional = true)
  @JoinColumn(name = "ROLE_ID")
  private Role role;

  @JsonView({EmployeeView.class})
  @Column(name = "PERSONAL_EMAIL_ID", length = 20, nullable = true)
  private String personalEmailId;

  @Enumerated(EnumType.STRING)
  @Column(name = "EMPLOYEE_TYPE", length = 10, nullable = false)
  private EmployeeType EmpType;

  public Employee() {
    super();
  }

  public Employee(long id) {
    super();
    this.id = id;
  }


  public String getEmail() {
    return this.email;
  }

  public String getHrmsId() {
    return this.hrmsId;
  }

  public long getId() {
    return this.id;
  }

  public Boolean getIsActive() {
    return this.isActive;
  }

  public Long getMobile() {
    return this.mobile;
  }

  public String getName() {
    return this.name;
  }

  public String getPassword() {
    return this.password;
  }

  public String getPersonalEmailId() {
    return this.personalEmailId;
  }


  public Role getRole() {
    return this.role;
  }

  public Boolean IsActive() {
    return this.isActive;
  }

  public void setEmail(final String email) {
    this.email = email;
  }

  public void setHrmsId(final String hrmsId) {
    this.hrmsId = hrmsId;
  }

  public void setId(final long id) {
    this.id = id;
  }

  public void setIsActive(final Boolean isActive) {
    this.isActive = isActive;
  }

  public void setMobile(final Long mobile) {
    this.mobile = mobile;
  }

  public void setName(final String name) {
    this.name = name;
  }


  public void setPassword(final String password) {
    this.password = password;
  }

  public void setPersonalEmailId(final String personalEmailId) {
    this.personalEmailId = personalEmailId;
  }

  public void setRole(final Role role) {
    this.role = role;
  }

public EmployeeType getEmpType() {
	return EmpType;
}

public void setEmpType(EmployeeType empType) {
	EmpType = empType;
}

}
