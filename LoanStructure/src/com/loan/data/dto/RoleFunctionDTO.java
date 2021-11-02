/**
 * 
 */
package com.loan.data.dto;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonView;
import com.loan.data.dto.MapDTO.EmployeeRoleView;
import com.loan.data.dto.MapDTO.RoleView;

/**
 * @author nageswara.rao
 *
 */
public class RoleFunctionDTO implements Serializable {

  /**
   * 
   */
  private static final long serialVersionUID = 1L;

  @JsonView({EmployeeRoleView.class, MapDTO.RoleView.class})
  private long id;

  @JsonView({EmployeeRoleView.class, RoleView.class})
  private Boolean canAdd;

  @JsonView({EmployeeRoleView.class, RoleView.class})
  private Boolean canEdit;

  @JsonView({EmployeeRoleView.class, RoleView.class})
  private Boolean canDelete;

  @JsonView({EmployeeRoleView.class, RoleView.class})
  private String canAddFlag;

  @JsonView({EmployeeRoleView.class, RoleView.class})
  private String canEditFlag;

  @JsonView(EmployeeRoleView.class)
  private String canDeleteFlag;

  @JsonView(RoleView.class)
  private Boolean canSearch;

  @JsonView(RoleView.class)
  private Boolean canPrint;

  @JsonView(RoleView.class)
  private Boolean canAdjustVoucherPosting;

  @JsonView(RoleView.class)
  private Boolean canExport;

  @JsonView(RoleView.class)
  private long menuId;

  @JsonView(RoleView.class)
  private FunctionDTO functionDTO;

  public String getCanAddFlag() {
    return canAddFlag;
  }

  public void setCanAddFlag(String canAddFlag) {
    this.canAddFlag = canAddFlag;
  }

  public String getCanEditFlag() {
    return canEditFlag;
  }

  public void setCanEditFlag(String canEditFlag) {
    this.canEditFlag = canEditFlag;
  }

  public String getCanDeleteFlag() {
    return canDeleteFlag;
  }

  public void setCanDeleteFlag(String canDeleteFlag) {
    this.canDeleteFlag = canDeleteFlag;
  }

  @JsonView(EmployeeRoleView.class)
  private RoleDTO role;

  @JsonView(EmployeeRoleView.class)
  private FunctionDTO function;

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public Boolean getCanAdd() {
    return canAdd;
  }

  public void setCanAdd(Boolean canAdd) {
    this.canAdd = canAdd;
  }

  public Boolean getCanEdit() {
    return canEdit;
  }

  public void setCanEdit(Boolean canEdit) {
    this.canEdit = canEdit;
  }

  public Boolean getCanDelete() {
    return canDelete;
  }

  public void setCanDelete(Boolean canDelete) {
    this.canDelete = canDelete;
  }

  public RoleDTO getRole() {
    return role;
  }

  public void setRole(RoleDTO role) {
    this.role = role;
  }

  public FunctionDTO getFunction() {
    return function;
  }

  public void setFunction(FunctionDTO function) {
    this.function = function;
  }

  public long getMenuId() {
    return menuId;
  }

  public void setMenuId(long menuId) {
    this.menuId = menuId;
  }

  public FunctionDTO getFunctionDTO() {
    return functionDTO;
  }

  public void setFunctionDTO(FunctionDTO functionDTO) {
    this.functionDTO = functionDTO;
  }

  public Boolean getCanSearch() {
    return canSearch;
  }

  public void setCanSearch(Boolean canSearch) {
    this.canSearch = canSearch;
  }

  public Boolean getCanPrint() {
    return canPrint;
  }

  public void setCanPrint(Boolean canPrint) {
    this.canPrint = canPrint;
  }

  public Boolean getCanAdjustVoucherPosting() {
    return canAdjustVoucherPosting;
  }

  public void setCanAdjustVoucherPosting(Boolean canAdjustVoucherPosting) {
    this.canAdjustVoucherPosting = canAdjustVoucherPosting;
  }

  public Boolean getCanExport() {
    return canExport;
  }

  public void setCanExport(Boolean canExport) {
    this.canExport = canExport;
  }



}
