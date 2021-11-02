/**
 * 
 */
package com.loan.data.dto;

import java.io.Serializable;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonView;
import com.loan.data.dto.MapDTO.EmployeeRoleView;
import com.loan.data.dto.MapDTO.EmployeeView;
import com.loan.data.dto.MapDTO.RoleView;
import com.loan.data.entity.Role;
import com.loan.data.types.PortalType;

/**
 * @author nageswara.rao
 *
 */
public class RoleDTO implements Serializable {

  private static final long serialVersionUID = 1L;

  @JsonView({EmployeeRoleView.class, EmployeeView.class})
  private long id;

  @JsonView({EmployeeRoleView.class, EmployeeView.class, 
      RoleView.class})
  private String name;

  @JsonView({RoleView.class})
  private Boolean isStoreHead;

  @JsonView({RoleView.class})
  private Boolean isCashier;

  @JsonView({RoleView.class})
  private Boolean isSalesExecutive;

  @JsonView({RoleView.class})
  private Boolean isSupervisor;

  @JsonView({EmployeeRoleView.class, EmployeeView.class, 
      MapDTO.RoleView.class})
  private String description;

  @JsonView({EmployeeRoleView.class, RoleView.class})
  private Set<RoleFunctionDTO> roleFunctionList = null;

  @JsonView(EmployeeRoleView.class)
  private RoleFunctionDTO function = null;

  @JsonView({MapDTO.RoleView.class})
  private PortalType oeOrSale;

  @JsonView(RoleView.class)
  private List<DataDTO> menuDto;

  public RoleDTO() {

  }

  public RoleDTO(Role role) {
    this.name = role.getName();
    this.description = role.getDescription();
    this.id = role.getId();
    Set<RoleFunctionDTO> roleFunctionList = new HashSet<RoleFunctionDTO>();

    role.getRoleFunctions().stream().forEach(roleFunction -> {
      RoleFunctionDTO roleFunctionDTO = new RoleFunctionDTO();
      roleFunctionDTO.setCanAdd(roleFunction.getCanAdd());
      roleFunctionDTO.setCanDelete(roleFunction.getCanDelete());
      roleFunctionDTO.setCanEdit(roleFunction.getCanEdit());
      FunctionDTO functionDTO = new FunctionDTO();
      roleFunctionDTO.setId(roleFunction.getId());
      functionDTO.setId(roleFunction.getFunction().getId());
      functionDTO.setCode(roleFunction.getFunction().getCode());
      functionDTO.setDescription(roleFunction.getFunction().getDescription());
      functionDTO.setMenu(roleFunction.getFunction().getMenu());
      roleFunctionDTO.setFunction(functionDTO);
      roleFunctionList.add(roleFunctionDTO);
    });
    this.roleFunctionList = roleFunctionList;
  }

  public RoleDTO(Role role, boolean bool) {

    this.name = role.getName();
    this.description = role.getDescription();


  }


  public Set<RoleFunctionDTO> getRoleFunctionList() {
    return roleFunctionList;
  }

  public void setRoleFunctionList(Set<RoleFunctionDTO> roleFunctionList) {
    this.roleFunctionList = roleFunctionList;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public RoleFunctionDTO getFunction() {
    return function;
  }

  public void setFunction(RoleFunctionDTO function) {
    this.function = function;
  }

  public List<DataDTO> getMenuDto() {
    return menuDto;
  }

  public void setMenuDto(List<DataDTO> menuDto) {
    this.menuDto = menuDto;
  }

  public PortalType getOeOrSale() {
    return oeOrSale;
  }

  public void setOeOrSale(PortalType oeOrSale) {
    this.oeOrSale = oeOrSale;
  }

  public Boolean getIsStoreHead() {
    return isStoreHead;
  }

  public void setIsStoreHead(Boolean isStoreHead) {
    this.isStoreHead = isStoreHead;
  }

  public Boolean getIsCashier() {
    return isCashier;
  }

  public void setIsCashier(Boolean isCashier) {
    this.isCashier = isCashier;
  }

  public Boolean getIsSalesExecutive() {
    return isSalesExecutive;
  }

  public void setIsSalesExecutive(Boolean isSalesExecutive) {
    this.isSalesExecutive = isSalesExecutive;
  }

  public Boolean getIsSupervisor() {
    return isSupervisor;
  }

  public void setIsSupervisor(Boolean isSupervisor) {
    this.isSupervisor = isSupervisor;
  }



}
