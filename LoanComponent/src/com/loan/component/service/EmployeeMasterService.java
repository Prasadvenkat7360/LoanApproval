package com.loan.component.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.ejb.Stateless;
import javax.persistence.Query;

import com.loan.common.exception.BusinessServiceException;
import com.loan.common.exception.OECode;
import com.loan.common.util.QueryFilter;
import com.loan.data.dto.DataDTO;
import com.loan.data.dto.EmployeeMasterDTO;
import com.loan.data.dto.FunctionDTO;
import com.loan.data.dto.MapDTO;
import com.loan.data.dto.RoleDTO;
import com.loan.data.dto.RoleFunctionDTO;
import com.loan.data.entity.Employee;
import com.loan.data.entity.Function;
import com.loan.data.entity.Role;
import com.loan.data.entity.RoleFunction;

/**
 * @author nageswara.rao
 *
 */

@Stateless
public class EmployeeMasterService extends BaseService
    implements EmployeeMasterLocal {

  /*
   * (non-Javadoc)
   * @see
   * com.dcpl.jes.component.service.CompanyLocal#getEmployeeRoleByCodeAndName(
   * java. lang.String, java.lang.String, java.lang.String)
   */
  @Override
  public boolean getEmployeeRoleByCodeAndNames(final String code,
      final String name, final long companyId) {
    boolean result = false;
    String sqlQuery = null;
    int numOfRoles = 0;
    Query query = null;
    try {
      sqlQuery =
          "SELECT R.NAME FROM ROLE R WHERE (R.NAME=:code AND R.COMPANY_ID=:companyId) OR (R.DESCRIPTION=:name AND COMPANY_ID=:companyId)";
      query = this.em.createNativeQuery(sqlQuery);
      query.setParameter("code", code);
      query.setParameter("name", name);
      query.setParameter("companyId", companyId);
      numOfRoles = query.executeUpdate();
      if (numOfRoles > 0) {
        result = true;
      }
      else {
        result = false;
      }
    }
    catch (final Exception e) {
      e.printStackTrace();
      throw e;
    }
    return result;
  }

  /*
   * (non-Javadoc)
   * @see com.dcpl.jes.component.service.EmployeeMasterLocal#
   * createEmployeeRoleDetails(com.dcpl.jes.data.dto.EmployeeMasterDTO)
   */
  @Override
  public MapDTO createEmployeeRoleDetails(EmployeeMasterDTO dto) {
    try {
      MapDTO result = new MapDTO();
      Set<Long> roleFunctionList = new HashSet<Long>();
      dto.getRole().getRoleFunctionList().stream().forEach(roleFunctionDto -> {
        roleFunctionList.add(roleFunctionDto.getFunction().getId());
      });
      if (roleFunctionList.size() == dto.getRole().getRoleFunctionList()
          .size()) {
        Role role = new Role();
        dto.getRole().getRoleFunctionList();
        role.setName(dto.getRole().getName());
        role.setDescription(dto.getRole().getDescription());
        Set<RoleFunctionDTO> roleFunctionDTOs =
            dto.getRole().getRoleFunctionList();
        Set<RoleFunction> functions = new HashSet<RoleFunction>();
        for (RoleFunctionDTO roleFunctionDTO : roleFunctionDTOs) {
          RoleFunction roleFunction = new RoleFunction();
          roleFunction.setCanAdd(roleFunctionDTO.getCanAdd());
          roleFunction.setCanDelete(roleFunctionDTO.getCanDelete());
          roleFunction.setCanEdit(roleFunctionDTO.getCanEdit());
          if (null != roleFunctionDTO.getFunction()) {
            Function function = super.findByPK(Function.class,
                roleFunctionDTO.getFunction().getId());
            roleFunction.setFunction(function);
          }
          roleFunction.setRole(role);
          functions.add(roleFunction);
        }
        role.setRoleFunctions(functions);
        super.create(role);
        result.setResCode("1");
        result.setMesgStr(
            "Role " + role.getDescription() + " has been Successfully Created");
        return result;
      }
      else if (roleFunctionList.size() != dto.getRole().getRoleFunctionList()
          .size()) {
        result.setMesgStr("Please Enter Unique Role Functions for the Role");
        result.setResCode("3");
      }
      return result;
    }
    catch (final Exception e) {
      e.printStackTrace();
      throw new BusinessServiceException("Unable To Create Employee Role");
    }
  }

  /*
   * (non-Javadoc)
   * @see
   * com.dcpl.jes.component.service.EmployeeRoleLocal#getCurrentLoggedInCompany(
   * )
   */

  /*
   * (non-Javadoc)
   * @see com.dcpl.jes.component.service.EmployeeMasterLocal#getFunctionList()
   */
  @Override
  public List<Function> getFunctionList() {
    return super.listAll(Function.class);
  }

  /*
   * (non-Javadoc)
   * @see
   * com.dcpl.jes.component.service.EmployeeMasterLocal#getEmployeeRoleListSize(
   * com.dcpl.jes.common.util.QueryFilter)
   */
  @Override
  public Long getEmployeeRoleListSize(final QueryFilter filter) {

    return super.getResultsSize(RoleFunction.class, filter);
  }

  /*
   * (non-Javadoc)
   * @see com.dcpl.jes.component.service.EmployeeMasterLocal#
   * getEmployeeRoleDetailsList(com.dcpl.jes.common.util.QueryFilter)
   */
  @Override
  public List<EmployeeMasterDTO> getEmployeeRoleDetailsList(
      final QueryFilter filter) {
    final List<RoleFunction> roleFunctions =
        super.getResultsPerPage(RoleFunction.class, filter);
    final List<EmployeeMasterDTO> roleList = new ArrayList<>();
    roleFunctions.stream().forEach(roleFunction -> {
      roleList.add(this.getEmployeeRoleDTO(roleFunction));
    });
    return roleList;
  }

  /**
   * @param role
   * @return EmployeeMasterDTO object
   */
  private EmployeeMasterDTO getEmployeeRoleDTO(RoleFunction roleFunction) {

    final EmployeeMasterDTO dto = new EmployeeMasterDTO();
    RoleDTO roleDTO = new RoleDTO();
    roleDTO.setName(roleFunction.getRole().getName());
    roleDTO.setDescription(roleFunction.getRole().getDescription());
    roleDTO.setId(roleFunction.getRole().getId());
    RoleFunctionDTO roleFunctionDTO = new RoleFunctionDTO();
    roleFunctionDTO.setCanAdd(roleFunction.getCanAdd());
    roleFunctionDTO.setCanDelete(roleFunction.getCanDelete());
    roleFunctionDTO.setCanEdit(roleFunction.getCanEdit());
    if (null != roleFunction.getCanAdd()) {
      roleFunctionDTO.setCanAddFlag(roleFunction.getCanAdd() ? "Yes" : "No");
    }
    if (null != roleFunction.getCanDelete()) {
      roleFunctionDTO
          .setCanDeleteFlag(roleFunction.getCanDelete() ? "Yes" : "No");
    }
    if (null != roleFunction.getCanEdit()) {
      roleFunctionDTO.setCanEditFlag(roleFunction.getCanEdit() ? "Yes" : "No");
    }
    FunctionDTO functionDTO = new FunctionDTO();
    roleFunctionDTO.setId(roleFunction.getId());
    functionDTO.setId(roleFunction.getFunction().getId());
    functionDTO.setCode(roleFunction.getFunction().getCode());
    functionDTO.setDescription(roleFunction.getFunction().getDescription());
    functionDTO.setMenu(roleFunction.getFunction().getMenu());
    roleFunctionDTO.setFunction(functionDTO);
    roleDTO.setFunction(roleFunctionDTO);
    dto.setRole(roleDTO);
    return dto;
  }

  /*
   * (non-Javadoc)
   * @see
   * com.dcpl.jes.component.service.EmployeeMasterLocal#editEmployeeRoleDetails(
   * com.dcpl.jes.common.util.QueryFilter)
   */
  @Override
  public List<EmployeeMasterDTO> editEmployeeRoleDetails(final QueryFilter qf) {
    final List<Role> roles = super.getResultsPerPage(Role.class, qf);
    final List<EmployeeMasterDTO> roleList = new ArrayList<>();
    roles.stream().forEach(role -> {
      role.getRoleFunctions().stream().forEach(rolefun -> {
        rolefun.getId();
        rolefun.getFunction().getId();
      });
      roleList.add(this.editEmployeeRoleDTO(role));
    });
    return roleList;
  }

  /**
   * @param role
   * @return EmployeeMasterDTO object
   */
  private EmployeeMasterDTO editEmployeeRoleDTO(final Role role) {
    final EmployeeMasterDTO dto = new EmployeeMasterDTO();
    RoleDTO roleDto = new RoleDTO(role);
    dto.setRole(roleDto);
    return dto;
  }

  /*
   * (non-Javadoc)
   * @see com.dcpl.jes.component.service.EmployeeMasterLocal#
   * updateEmployeeRoleDetails(com.dcpl.jes.data.dto.EmployeeMasterDTO)
   */
  @Override
  public MapDTO updateEmployeeRoleDetails(final EmployeeMasterDTO dto) {
    MapDTO result = new MapDTO();
    Set<Long> roleFunctionList = new HashSet<Long>();
    dto.getRole().getRoleFunctionList().stream().forEach(roleFunctionDto -> {
      roleFunctionList.add(roleFunctionDto.getFunction().getId());
    });
    if (roleFunctionList.size() == dto.getRole().getRoleFunctionList().size()) {
      final Role role = super.findByPK(Role.class, dto.getRole().getId());
      role.setName(dto.getRole().getName());
      role.setDescription(dto.getRole().getDescription());
      Set<RoleFunction> roleFunctions = new HashSet<RoleFunction>();
      dto.getRole().getRoleFunctionList().stream().forEach(roleFunctionDto -> {
        if (roleFunctionDto.getId() > 0) {
          RoleFunction roleFunction =
              super.findByPK(RoleFunction.class, roleFunctionDto.getId());
          roleFunction.setCanAdd(roleFunctionDto.getCanAdd());
          roleFunction.setCanDelete(roleFunctionDto.getCanDelete());
          roleFunction.setCanEdit(roleFunctionDto.getCanEdit());
          if (null != roleFunction.getFunction()) {
            Function function = super.findByPK(Function.class,
                roleFunctionDto.getFunction().getId());
            roleFunction.setFunction(function);
          }
          roleFunction.setRole(role);
          roleFunctions.add(roleFunction);
        }
        else {
          RoleFunction roleFunction = new RoleFunction();
          roleFunction.setCanAdd(roleFunctionDto.getCanAdd());
          roleFunction.setCanDelete(roleFunctionDto.getCanDelete());
          roleFunction.setCanEdit(roleFunctionDto.getCanEdit());
          if (null != roleFunctionDto.getFunction()) {
            Function function = super.findByPK(Function.class,
                roleFunctionDto.getFunction().getId());
            roleFunction.setFunction(function);
          }
          roleFunction.setRole(role);
          roleFunctions.add(roleFunction);
        }
      });
      role.setRoleFunctions(roleFunctions);
      super.update(role);
      result.setMesgStr("Employee role updated successfully");
      result.setResCode("1");
    }
    else if (roleFunctionList.size() != dto.getRole().getRoleFunctionList()
        .size()) {
      result.setMesgStr("Please Enter Unique Role Functions for the Role");
      result.setResCode("3");
    }
    return result;
  }

  /*
   * (non-Javadoc)
   * @see com.dcpl.jes.component.service.EmployeeMasterLocal#
   * getEmployeeDesignationByCodeAndNames(java.lang.String, java.lang.String)
   */
  @Override
  public boolean getEmployeeDesignationByCodeAndNames(String code, String name,
      long companyId) {
    boolean exist = false;
    try {/*
      final List<Designation> designation =
          (List<Designation>) super.findNamedQueryResultList(Designation.class,
              "Designation.findByCodeAndName", "degnCode", code, "degnName",
              name, "companyId", companyId);
      if (0 != designation.size()) {
        exist = true;

      }
      else exist = false;
    */}
    catch (Exception e) {
      e.printStackTrace();
    }
    return exist;
  }

  /*
   * (non-Javadoc)
   * @see com.dcpl.jes.component.service.EmployeeMasterLocal#
   * createEmployeeDesignation(java.lang.String, java.lang.String, long)
   */
  @Override
  public void createEmployeeDesignation(String code, String name, long compId) {
    try {
    }
    catch (final Exception e) {
      e.printStackTrace();
      throw new BusinessServiceException(e.getMessage(), OECode.CONTACT_ADMIN);
    }
  }

  /*
   * (non-Javadoc)
   * @see com.dcpl.jes.component.service.EmployeeMasterLocal#
   * getEmployeeDesignationListSize(com.dcpl.jes.common.util.QueryFilter)
   */

  /*
   * (non-Javadoc)
   * @see com.dcpl.jes.component.service.EmployeeMasterLocal#
   * getEmployeeDesignationDetailsList(com.dcpl.jes.common.util.QueryFilter)
   */

  /**
   * @param desdetails
   * @return
   */

  /*
   * (non-Javadoc)
   * @see com.dcpl.jes.component.service.EmployeeMasterLocal#
   * editEmployeDesignationDetails(java.lang.Long)
   */

  /*
   * (non-Javadoc)
   * @see com.dcpl.jes.component.service.EmployeeMasterLocal#
   * updateEmployeeDesignationDetails(com.dcpl.jes.data.dto.EmployeeMasterDTO)
   */


  @Override
  public List<EmployeeMasterDTO> getEmployeeDetailsList(QueryFilter filter)
      throws Exception {
    final List<Employee> employee =
        super.getResultsPerPage(Employee.class, filter);
    final List<EmployeeMasterDTO> employeeList = new ArrayList<>();
    employee.stream().forEach(emp -> {
      employeeList.add(this.getEmployeeDTO(emp));
    });
    return employeeList;
  }

  private EmployeeMasterDTO getEmployeeDTO(Employee emp) {
    EmployeeMasterDTO employeeMasterDTO = new EmployeeMasterDTO(emp);
    return employeeMasterDTO;
  }

  @Override
  public BaseService getBaseService() {
    return this;
  }


  @Override
  public List<DataDTO> getAllEmployeeRoleNames() {
    final List<DataDTO> dataDTOs = new ArrayList<DataDTO>();
    List<Role> roles = new ArrayList<Role>();
    roles = super.findNamedQueryResultList(Role.class, "Role.FindRoleForAll");
    roles.stream()
        .forEach(role -> dataDTOs.add(new DataDTO(Long.toString(role.getId()),
            role.getName(), role.getDescription())));
    return dataDTOs;
  }


  @Override
  public Employee employeeByHrmsId(String hrmsId) {
    return super.findByName(Employee.class, "hrmsId", hrmsId);
  }





  @Override
  public Employee getEmployeeByHrmsId(String hrmsId) {
    return super.findNamedQueryResult(Employee.class,
        "Employee.EmployeeDetailsByHrmsId", "hrmsId", hrmsId);
  }

  @Override
  public List<DataDTO> findPortalByRole(String storeOrDc) {
    String portal = "OE";
    if ("Store".equals(storeOrDc)) {
      portal = "SALES";
    }
    List<DataDTO> data = new ArrayList<>();

    String query = "select distinct rl.* from role_menu rm inner join role rl "
        + "on rl.id=rm.role_id and rm.menu_id in(select id from menu where OE_SALE='"
        + portal + "')";
    List<Role> roles =
        this.em.createNativeQuery(query, Role.class).getResultList();

    roles.stream().forEach(rl -> {
      data.add(new DataDTO(String.valueOf(rl.getId()), rl.getName(),
          rl.getDescription()));

    });
    return data;
  }

}
