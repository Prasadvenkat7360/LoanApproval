package com.loan.component.service;

import javax.ejb.Stateless;

import com.loan.common.exception.BusinessServiceException;
import com.loan.data.dto.EmployeeDTO;
import com.loan.data.entity.Employee;
import com.loan.data.types.PortalType;


/**
 * @author Sriki
 *
 */
@Stateless
public class EmployeeService extends BaseService implements EmployeeLocal {

  @Override
  public EmployeeDTO authenticate(final String hrmsId, final String pwd) {

    final Employee emp = super.findNamedQueryResult(Employee.class,
        "Employee.authenticate", "hrmsId", hrmsId, "pwd", pwd);
    EmployeeDTO empDTO = null;
    if (emp != null) {
      empDTO = new EmployeeDTO(emp);
      /*empDTO.setPortalType(
          (emp.getStoreOrDCType() == StoreOrDCType.DC) ? PortalType.OE : null);
      empDTO.setStateId(this.getLoggedInStateDTO(empDTO).getId());*/
      if (emp != null) {
       /* if (null != emp.getZone())
          empDTO.setZoneId(emp.getZone().getId());*/
      /*  final List<MetalSegment> segments = new ArrayList<MetalSegment>();
        if (emp.getZone() != null) {


          final List<ZoneMetalType> zoneMetalTypeList =
              emp.getZone().getZoneMetalTypes();
          zoneMetalTypeList.sort((ZoneMetalType o1,
              ZoneMetalType o2) -> o1.getDisplayOrder() - o2.getDisplayOrder());
          // get the metal segments from ZoneMetalTypes
          zoneMetalTypeList.stream()
              .forEach(type -> segments.add(type.getSegment()));
        }*/
        // just loop thru segments so that lazy loading will not create any
        // issues later on
       /* segments.stream().forEach(segment -> {
          segment.getDescription();
          segment.getCode();
        });


        empDTO.setSegments(segments);
*/      }
      /**
       * now validation is done at the time of login
       */
      /*
       * if (emp.getRole() != null) { List<Function> functionCodes =
       * super.findNamedQueryResultList( Function.class,
       * "RoleFunction.findAllFunctionForRole", "roleId",
       * emp.getRole().getId()); empDTO.setFunctions(functionCodes); }
       */
    }

    return empDTO;
  }


  @Override
  public EmployeeDTO schedulerAuthenticate(final String hrmsId,
      final String pwd) {

    final Employee emp = super.findNamedQueryResult(Employee.class,
        "Employee.authenticateByRole", "hrmsId", hrmsId, "pwd", pwd, "roleName",
        "ADMIN");
    EmployeeDTO empDTO = null;
    if (emp != null) {
      empDTO = new EmployeeDTO(emp);
      empDTO.setPortalType(PortalType.JES_SCHEDULER);
    }
    return empDTO;
  }


  @Override
  public Employee getEmployee(com.loan.data.entity.Employee emp) {
    emp = new Employee();
    emp.setEmail("srikanth@");
    return emp;
  }




  @Override
  public Employee findByHrmsId(String hrmsId) {
    Employee emp = super.findNamedQueryResult(Employee.class,
        "Employee.EmployeeListByHrmsId", "hrmsId", hrmsId);
    if (null == emp)
      throw new BusinessServiceException(
          "No employee found with HrmsId " + hrmsId);
    return emp;

  }

}
