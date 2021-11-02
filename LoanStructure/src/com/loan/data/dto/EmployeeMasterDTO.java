/**
 *
 */
package com.loan.data.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonView;
import com.loan.data.dto.MapDTO.EmployeeRoleView;
import com.loan.data.dto.MapDTO.EmployeeView;
import com.loan.data.entity.Employee;
/**
 * @author venkata.prasad
 *
 */
public class EmployeeMasterDTO extends DTO {

  private static final long serialVersionUID = 1L;

  @JsonView({EmployeeRoleView.class, EmployeeView.class})
  private RoleDTO role;

  @JsonView({EmployeeView.class})
  private List<RoleDTO> roleList;

  @JsonView({EmployeeView.class})
  private long empId;

  @JsonView({EmployeeView.class})
  private String empName;


  @JsonView({EmployeeView.class})
  private Boolean isActive;


  @JsonView({EmployeeView.class})
  private String hrmsId;

  @JsonView({EmployeeView.class})
  private String password;


  @JsonView({EmployeeView.class})
  private Long mobile;

  @JsonView({EmployeeView.class})
  private String email;

  @JsonView({EmployeeView.class})
  private String personalEmailId;


  public EmployeeMasterDTO() {

  }

  public EmployeeMasterDTO(final Employee emp) {
    this.empId = emp.getId();
    this.empName = emp.getName();
    this.isActive = emp.getIsActive();
    if (null != emp.getRole())
      this.role = new RoleDTO(emp.getRole());

    this.hrmsId = emp.getHrmsId();
    this.password = emp.getPassword();
    this.mobile = emp.getMobile();
    this.email = emp.getEmail();
    this.personalEmailId = emp.getPersonalEmailId();
  }


  public String getEmail() {
    return this.email;
  }


  public long getEmpId() {
    return this.empId;
  }

  public String getEmpName() {
    return this.empName;
  }



  public String getHrmsId() {
    return this.hrmsId;
  }

  public Boolean getIsActive() {
    return this.isActive;
  }

  public Long getMobile() {
    return this.mobile;
  }

  public String getPassword() {
    return this.password;
  }

  public String getPersonalEmailId() {
    return this.personalEmailId;
  }

  public RoleDTO getRole() {
    return this.role;
  }

  public List<RoleDTO> getRoleList() {
    return roleList;
  }

  public void setRoleList(List<RoleDTO> roleList) {
    this.roleList = roleList;
  }

  public void setEmail(final String email) {
    this.email = email;
  }


  public void setEmpId(final long empId) {
    this.empId = empId;
  }

  public void setEmpName(final String empName) {
    this.empName = empName;
  }

  public void setHrmsId(final String hrmsId) {
    this.hrmsId = hrmsId;
  }

  public void setIsActive(final Boolean isActive) {
    this.isActive = isActive;
  }

  public void setMobile(final Long mobile) {
    this.mobile = mobile;
  }

  public void setPassword(final String password) {
    this.password = password;
  }

  public void setPersonalEmailId(final String personalEmailId) {
    this.personalEmailId = personalEmailId;
  }

  public void setRole(final RoleDTO role) {
    this.role = role;
  }


}
