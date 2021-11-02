package com.loan.data.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonView;
import com.loan.data.dto.MapDTO.MapDTOView;
import com.loan.data.entity.Employee;
import com.loan.data.types.PortalType;

public class EmployeeDTO  {

  private static final long serialVersionUID = 1L;

  @JsonView({MapDTOView.class})
  private long empId;

  @JsonView({MapDTOView.class})
  private String name;
  private Long companyId;
  private Long businessId;
  private Long groupId;
  @JsonView({MapDTOView.class})
  private Long storeId;
  @JsonView({MapDTOView.class})
  private Long dcId;
  private String companCode;
  private String groupCode;
  private Long zoneId;
  private Long superVisorId;
  private Long regionId;
  private Long stateId;
  private PortalType portalType;


  @JsonView({MapDTOView.class})
  private String storeName;

  @JsonView({MapDTOView.class})
  private String storeLoc;

  @JsonView({MapDTOView.class})
  private String roleName;

  @JsonView({MapDTOView.class})
  private Long roleId;

  @JsonView({MapDTOView.class})
  private List<FunctionDTO> functions;

  @JsonView({MapDTOView.class})
  private String weighingScaleFlag;

  @JsonView({MapDTOView.class})
  private String hrms_id;


  public EmployeeDTO() {

  }

  public EmployeeDTO(final Long id, String name) {
    this.name = name;
  }

  public EmployeeDTO(final Employee emp) {
    this.hrms_id = emp.getHrmsId();
    this.empId = emp.getId();

    this.name = emp.getName();
    this.roleName = emp.getRole() != null ? emp.getRole().getName() : "";
    if (null != emp.getRole())
      this.roleId = emp.getRole().getId();
  }

  public Long getBusinessId() {
    return this.businessId;
  }

  public String getCompanCode() {
    return this.companCode;
  }

  public Long getCompanyId() {
    return this.companyId;
  }

  public long getEmpId() {
    return this.empId;
  }

  public List<FunctionDTO> getFunctions() {
    return this.functions;
  }

  public String getGroupCode() {
    return this.groupCode;
  }

  public String getName() {
    return this.name;
  }

  public String getRoleName() {
    return this.roleName;
  }

  public Long getStoreId() {
    return this.storeId;
  }

  public String getStoreLoc() {
    return this.storeLoc;
  }

  public String getStoreName() {
    return this.storeName;
  }

  public Long getSuperVisorId() {
    return this.superVisorId;
  }

  public Long getZoneId() {
    return this.zoneId;
  }

  public void setBusinessId(final Long businessId) {
    this.businessId = businessId;
  }

  public void setCompanCode(final String companCode) {
    this.companCode = companCode;
  }

  public void setCompanyId(final Long companyId) {
    this.companyId = companyId;
  }

  public void setEmpId(final long empId) {
    this.empId = empId;
  }

  public void setFunctions(final List<FunctionDTO> functions) {
    this.functions = functions;
  }

  public Long getGroupId() {
    return groupId;
  }

  public void setGroupId(Long groupId) {
    this.groupId = groupId;
  }

  public void setGroupCode(final String groupCode) {
    this.groupCode = groupCode;
  }

  public void setName(final String name) {
    this.name = name;
  }

  public void setRoleName(final String roleName) {
    this.roleName = roleName;
  }

  public void setStoreId(final Long storeId) {
    this.storeId = storeId;
  }

  public void setStoreLoc(final String storeLoc) {
    this.storeLoc = storeLoc;
  }

  public void setStoreName(final String storeName) {
    this.storeName = storeName;
  }

  public void setSuperVisorId(final Long superVisorId) {
    this.superVisorId = superVisorId;
  }

  public void setZoneId(final Long zoneId) {
    this.zoneId = zoneId;
  }

  public Long getDcId() {
    return dcId;
  }

  public void setDcId(Long dcId) {
    this.dcId = dcId;
  }

  /*
   * public boolean isMenuVisible(String menuName) { Function result =
   * this.functions.stream() .filter(f ->
   * menuName.equals(f.getMenu())).findAny().orElse(null); if (result != null) {
   * return true; } return false; } public boolean hasAccess(String
   * functionName) { Function result = this.functions.stream() .filter(f ->
   * functionName.equals(f.getCode())).findAny().orElse(null); if (result !=
   * null) { return true; } return false; }
   */

  public Long getRegionId() {
    return regionId;
  }

  public void setRegionId(Long regionId) {
    this.regionId = regionId;
  }


  public String getWeighingScaleFlag() {
    return weighingScaleFlag;
  }

  public void setWeighingScaleFlag(String weighingScaleFlag) {
    this.weighingScaleFlag = weighingScaleFlag;
  }

  public String getHrms_id() {
    return hrms_id;
  }

  public void setHrms_id(String hrms_id) {
    this.hrms_id = hrms_id;
  }

  public PortalType getPortalType() {
    return portalType;
  }

  public void setPortalType(PortalType portalType) {
    this.portalType = portalType;
  }

  public Long getStateId() {
    return stateId;
  }

  public void setStateId(Long stateId) {
    this.stateId = stateId;
  }


  public Long getRoleId() {
    return roleId;
  }

  public void setRoleId(Long roleId) {
    this.roleId = roleId;
  }


}
