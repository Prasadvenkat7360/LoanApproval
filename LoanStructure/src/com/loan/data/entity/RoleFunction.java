package com.loan.data.entity;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
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

import com.fasterxml.jackson.annotation.JsonView;
import com.loan.data.dto.MapDTO.EmployeeRoleView;
import com.loan.data.dto.MapDTO.RoleView;

/**
 * Entity implementation class for Entity: RoleFunction
 * 
 */
@Entity
@Table(name = "ROLE_FUNCTION")
@NamedQueries({
    @NamedQuery(name = "RoleFunction.findAllFunctionForRole",
        query = "SELECT o.function FROM RoleFunction o where o.role.id = :roleId"),
    @NamedQuery(name = "RoleFunction.FindFunction",
        query = "SELECT o.function FROM RoleFunction o where o.role.id = :roleId and o.menu.Id=:menuId order by o.function.description ASC"),
    @NamedQuery(name = "RoleFunction.Findduplicate",
        query = "SELECT o FROM RoleFunction o where o.role.id = :roleId and o.menu.Id=:menuId and o.function.id=:function "),})
public class RoleFunction implements Serializable {

  private static final long serialVersionUID = 1L;



  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE,
      generator = "role_function_seq_id")
  @SequenceGenerator(name = "role_function_seq_id",
      sequenceName = "ROLE_FUNCTION_SEQ", allocationSize = 1,initialValue = 1)
  @Column(name = "ID")
  private long id;

  @JsonView(EmployeeRoleView.class)
  @Column(name = "ADD_Y_N", nullable = true)
  private Boolean canAdd;

  @JsonView(EmployeeRoleView.class)
  @Column(name = "EDIT_Y_N", nullable = true)
  private Boolean canEdit;

  @JsonView(EmployeeRoleView.class)
  @Column(name = "DELETE_Y_N", nullable = true)
  private Boolean canDelete;

  @Column(name = "CAN_SEARCH")
  private Boolean canSearch;

  @Column(name = "CAN_PRINT")
  private Boolean canPrint;

  @Column(name = "CAN_ADJUST_VOUCHER_POSTING")
  private Boolean canAdjustVoucherPosting;

  @Column(name = "CAN_EXPORT")
  private Boolean canExport;


  @JsonView(EmployeeRoleView.class)
  @ManyToOne(cascade = {CascadeType.DETACH}, fetch = FetchType.LAZY,
      optional = false)
  @JoinColumn(name = "ROLE_ID")
  private Role role;

  @JsonView(RoleView.class)
  @ManyToOne(cascade = {CascadeType.DETACH}, fetch = FetchType.LAZY,
      optional = false)
  @JoinColumn(name = "FUNCTION_ID")
  private Function function;

  @JsonView(EmployeeRoleView.class)
  @ManyToOne(cascade = {CascadeType.DETACH}, fetch = FetchType.LAZY,
      optional = false)
  @JoinColumn(name = "MENU_ID")
  private Menu menu;



  public RoleFunction() {
    super();
  }

  public RoleFunction(long id, Boolean canAdd, Boolean canEdit,
      Boolean canDelete, Role role, Function function, Menu menu) {
    super();
    this.id = id;
    this.canAdd = canAdd;
    this.canEdit = canEdit;
    this.canDelete = canDelete;
    this.role = role;
    this.function = function;
    this.menu = menu;
  }

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

  public Role getRole() {
    return role;
  }

  public void setRole(Role role) {
    this.role = role;
  }

  public Function getFunction() {
    return function;
  }

  public void setFunction(Function function) {
    this.function = function;
  }

  public Menu getMenu() {
    return menu;
  }

  public void setMenu(Menu menu) {
    this.menu = menu;
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
