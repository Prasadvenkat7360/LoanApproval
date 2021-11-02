/**
 * 
 */
package com.loan.component.service;

import java.util.List;

import com.loan.common.util.QueryFilter;
import com.loan.data.dto.DataDTO;
import com.loan.data.dto.EmployeeMasterDTO;
import com.loan.data.dto.MapDTO;
import com.loan.data.entity.Employee;
import com.loan.data.entity.Function;

/**
 * @author nageswara.rao
 *
 */
public interface EmployeeMasterLocal {

  // Employee Role

  public boolean getEmployeeRoleByCodeAndNames(String code, String name,
      long companyId);

  public MapDTO createEmployeeRoleDetails(EmployeeMasterDTO dto);


  public List<Function> getFunctionList();

  public Long getEmployeeRoleListSize(QueryFilter filter);

  public List<EmployeeMasterDTO> getEmployeeRoleDetailsList(QueryFilter filter);

  public List<EmployeeMasterDTO> editEmployeeRoleDetails(QueryFilter qf);

  public MapDTO updateEmployeeRoleDetails(EmployeeMasterDTO dto);

  // designation

  public boolean getEmployeeDesignationByCodeAndNames(final String code,
      final String name, long companyId);

  public void createEmployeeDesignation(String code, String name, long compId);



  // Employee Master



  public List<EmployeeMasterDTO> getEmployeeDetailsList(QueryFilter filter)
      throws Exception;



  public BaseService getBaseService();


  public List<DataDTO> getAllEmployeeRoleNames();


  Employee employeeByHrmsId(String hrmsId);

  Employee getEmployeeByHrmsId(String hrmsId);

  public List<DataDTO> findPortalByRole(String portal);

}
