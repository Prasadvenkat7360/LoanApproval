package com.loan.component.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.SortedSet;
import java.util.TreeMap;
import java.util.TreeSet;
import java.util.function.Predicate;

import javax.ejb.Stateless;

import com.loan.common.exception.BusinessServiceException;
import com.loan.common.util.CommonUtil;
import com.loan.common.util.Constants;
import com.loan.common.util.QueryFilter;
import com.loan.data.dto.DataDTO;
import com.loan.data.dto.FunctionDTO;
import com.loan.data.dto.MenuDto;
import com.loan.data.dto.RoleDTO;
import com.loan.data.dto.RoleFunctionDTO;
import com.loan.data.entity.Employee;
import com.loan.data.entity.Function;
import com.loan.data.entity.Menu;
import com.loan.data.entity.Role;
import com.loan.data.entity.RoleFunction;
import com.loan.data.types.PortalType;
import com.loan.util.AuditListener;


@Stateless
public class RoleFunctionService extends BaseService
    implements RoleFunctionLocal {

  @Override
  public List<Menu> findRole(String hrmsId) {

    Employee employee = super.findNamedQueryResult(Employee.class,
        "Employee.EmployeeDetailsByHrmsId", "hrmsId", hrmsId);
    Role role = employee.getRole();
    if (null == role)
      throw new BusinessServiceException(
          "No role Assigned to you Please  Contact your Adminstrarot");
    List<Menu> menus = (List<Menu>) role.getMenu();
    if (menus.isEmpty())
      throw new BusinessServiceException(
          "No Functions assigned to you please contact your Adminstrator");
    menus.stream().forEach(
        m -> m.setFuList(this.getRoleFUnction(m.getId(), role.getId())));
    return menus;

  }

  private SortedSet<Function> getRoleFUnction(Long menuId, long roleId) {
    List<Long> list = new ArrayList<>();
    SortedSet<Function> sortedSet = new TreeSet<>();

    List<Function> functions = super.findNamedQueryResultList(Function.class,
        "RoleFunction.FindFunction", Constants.ROLE_ID, roleId,
        Constants.MENU_ID, menuId);

    functions.stream().forEach(fn -> {
      if (null != fn.getParentFunction())
        list.add(fn.getId());
    });



    Predicate<Function> func = fn -> null != fn.getParentFunction();
    func = func.and(CommonUtil.distinctByKeys(fn -> Arrays
        .asList(fn.getParentFunction().getId(), fn.getMainMenu().getId())));

    functions.stream().filter(func).forEach(fm -> {
      fm.getParentFunction().getId();
      fm.setSubfunc(this.getSubMenu(fm, list));
    });
    sortedSet.addAll(functions);
    return sortedSet;
  }


  private TreeMap<Function, TreeSet<Function>> getSubMenu(Function func,
      List<Long> fId) {
    TreeMap<Function, TreeSet<Function>> subfunc = new TreeMap<>();
    TreeSet<Function> fn = new TreeSet<>();

    List<Function> funcs = super.findNamedQueryResultList(Function.class,
        "Function.FindSubFunction", "paId", func.getParentFunction().getId(),
        "id", fId);
    fn.addAll(funcs);

    subfunc.put(func.getParentFunction(), fn);
    return subfunc;

  }

  @Override
  public void createRole(RoleDTO roleDto) {
    List<Role> roles = super.findNamedQueryResultList(Role.class,
        "Role.findROllByName", "name", roleDto.getName());
    if (!roles.isEmpty())
      throw new BusinessServiceException(
          "Role Already Exist with Same Name : " + roleDto.getName());
    Role role = this.setRole(roleDto);
    role = super.createEntity(role);
    this.creRoleFUnction(role, roleDto.getRoleFunctionList());

  }

  private Role setRole(RoleDTO roleDto) {
    Role role = new Role();
    role.setName(roleDto.getName());
    role.setDescription(roleDto.getDescription());
    Collection<Menu> menus = this.getmenus(roleDto.getMenuDto(), role);
    if (!menus.isEmpty())
      role.setMenu(menus);
    else throw new BusinessServiceException("Please select The menu");

    return role;
  }

  private void creRoleFUnction(Role role,
      Set<RoleFunctionDTO> roleFunctionDTOs) {
    roleFunctionDTOs.stream().forEach(rf -> {
      RoleFunction roleFunction = null;
      roleFunction = new RoleFunction();
      roleFunction.setCanAdd(rf.getCanAdd());
      roleFunction.setCanDelete(rf.getCanDelete());
      roleFunction.setCanEdit(rf.getCanEdit());
      roleFunction.setCanPrint(rf.getCanPrint());
      roleFunction.setCanExport(rf.getCanExport());
      roleFunction.setCanSearch(rf.getCanSearch());
      roleFunction.setCanAdjustVoucherPosting(rf.getCanAdjustVoucherPosting());
      roleFunction.setMenu(new Menu(rf.getMenuId()));
      roleFunction.setRole(role);
      roleFunction.setFunction(new Function(rf.getFunctionDTO().getId()));
      if (0 >= rf.getId()) {
        if (this.isRoleFunctionExist(rf, role))
          throw new BusinessServiceException(
              "You can not assign same function two times");
        super.create(roleFunction);
      }
      else {
        roleFunction.setId(rf.getId());
        super.update(roleFunction);
      }

    });
  }

  private boolean isRoleFunctionExist(RoleFunctionDTO roleFunction, Role role) {
    boolean bool = false;
    RoleFunction rfFunction = super.findNamedQueryResult(RoleFunction.class,
        "RoleFunction.Findduplicate", "roleId", role.getId(), Constants.MENU_ID,
        new Long(roleFunction.getMenuId()), "function",
        roleFunction.getFunctionDTO().getId());
    if (null != rfFunction)
      bool = true;
    return bool;
  }

  private Collection<Menu> getmenus(List<DataDTO> menuDto, Role role) {
    List<Menu> menu = new ArrayList<>();
    List<Role> roles = new ArrayList<>();
    roles.add(role);
    menuDto.stream().forEach(mn -> {
      Menu m = super.findByPK(Menu.class, Long.parseLong(mn.getId()));
      menu.add(m);
    });
    return menu;
  }

  @Override
  public List<DataDTO> getMenu(PortalType module) {
    List<DataDTO> menuDtos = new ArrayList<>();
    List<Menu> menus = super.findNamedQueryResultList(Menu.class,
        "Menu.FindByModule", "oeOrSale", module);
    menus.stream().forEach(
        m -> menuDtos.add(new DataDTO(String.valueOf(m.getId()), m.getName())));
    return menuDtos;
  }

  @Override
  public List<FunctionDTO> getFunctionByMneu(String menuId) {
    List<FunctionDTO> functions = new ArrayList<>();
    String[] menuIds = menuId.split(",");
    List<String> menus = Arrays.asList(menuIds);
    List<Long> menuids =
        CommonUtil.convertList(menus, mId -> Long.parseLong(mId));
    List<Function> fnList = super.findNamedQueryResultList(Function.class,
        "Function.FindFinctionbyMenu", Constants.MENU_ID, menuids);
    fnList.stream().forEach(fn -> functions.add(this.getfunctionDto(fn)));
    return functions;
  }

  private FunctionDTO getfunctionDto(Function fn) {
    FunctionDTO functionDTO = new FunctionDTO();
    functionDTO.setId(fn.getId());
    functionDTO.setDescription(fn.getDescription());
    functionDTO.setCode(fn.getCode());
    functionDTO.setMenuDto(new MenuDto(fn.getMainMenu()));
    return functionDTO;
  }

  @Override
  public void updteRoleFunction(RoleDTO roleDTO) {
    Role role = super.findByPK(Role.class, roleDTO.getId());
    role.setDescription(roleDTO.getDescription());
    role.setMenu(this.getmenus(roleDTO.getMenuDto(), role));
    super.update(role);

    if (!roleDTO.getRoleFunctionList().isEmpty()) {
      this.creRoleFUnction(role, roleDTO.getRoleFunctionList());
    }
  }

  @Override
  public RoleDTO getRoleDetaibyId(long id) {

    Role role = super.findByPK(Role.class, id);
    return this.getRoleDto(role);


  }

  private RoleDTO getRoleDto(Role role) {
    RoleDTO rolDto = new RoleDTO(role, true);
    rolDto.setId(role.getId());
    rolDto.setMenuDto(this.getmenuDto(role.getMenu(), rolDto));
    rolDto
        .setRoleFunctionList(this.setroleFunctionDto(role.getRoleFunctions()));
    return rolDto;

  }

  private Set<RoleFunctionDTO> setroleFunctionDto(
      Set<RoleFunction> roleFunctions) {
    Set<RoleFunctionDTO> roleFunctionDTOs = new HashSet<>();
    roleFunctions.stream()
        .forEach(rf -> roleFunctionDTOs.add(this.setrolefunction(rf)));
    return roleFunctionDTOs;
  }

  private RoleFunctionDTO setrolefunction(RoleFunction roleFunctions) {
    RoleFunctionDTO roleFunctionDTO = new RoleFunctionDTO();
    roleFunctionDTO.setId(roleFunctions.getId());
    roleFunctionDTO.setCanAdd(roleFunctions.getCanAdd());
    roleFunctionDTO.setCanEdit(roleFunctions.getCanEdit());
    roleFunctionDTO.setCanPrint(roleFunctions.getCanPrint());
    roleFunctionDTO.setCanExport(roleFunctions.getCanExport());
    roleFunctionDTO.setCanSearch(roleFunctions.getCanSearch());
    roleFunctionDTO.setCanDelete(roleFunctions.getCanDelete());
    roleFunctionDTO
        .setCanAdjustVoucherPosting(roleFunctions.getCanAdjustVoucherPosting());
    roleFunctionDTO.setMenuId(roleFunctions.getMenu().getId());
    roleFunctionDTO
        .setFunctionDTO(this.getfunctionDto(roleFunctions.getFunction()));
    return roleFunctionDTO;
  }

  private List<DataDTO> getmenuDto(Collection<Menu> menu, RoleDTO roleDTO) {
    List<DataDTO> menuDto = new ArrayList<>();
    menu.stream().forEach(m -> {
      menuDto.add(new DataDTO(String.valueOf(m.getId()), m.getName()));
      roleDTO.setOeOrSale(m.getOeOrSale());
    });
    return menuDto;
  }

  @Override
  public Long getRoleSize(QueryFilter filter) {

    return super.getResultsSize(Role.class, filter);
  }

  @Override
  public List<RoleDTO> getRoles(QueryFilter filter) {
    List<RoleDTO> roleDTOs = new ArrayList<>();
    List<Role> role = super.getResultsPerPage(Role.class, filter);
    role.stream().forEach(rl -> roleDTOs.add(this.getRole(rl)));
    return roleDTOs;
  }

  private RoleDTO getRole(Role role) {

    RoleDTO roleDTO = new RoleDTO();
    roleDTO.setId(role.getId());
    roleDTO.setName(role.getName());
    roleDTO.setDescription(role.getDescription());
    return roleDTO;
  }

  @Override
  public void deleteRoleFunction(long id) {
    RoleFunction rfFunction = null;
    rfFunction = super.findByPK(RoleFunction.class, id);
    if (null != rfFunction)
      super.delete(rfFunction);
    else throw new BusinessServiceException("ROleFunction Not Found ");
  }

  @Override
  public RoleFunctionDTO findPermission(QueryFilter filter) {
    long funcId = 0;
    long menuId = 0;
    Map<String, Object> values = filter.getFieldFilters();
    if (null == values.get("funcId") || null == values.get(Constants.MENU_ID))
      throw new BusinessServiceException(
          "Role and function id Required for Permission");
    funcId = Long.parseLong(values.get("funcId").toString());
    menuId = Long.parseLong(values.get("menuId").toString());
    long roleId = super.findNamedQueryResult(Employee.class,
        "Employee.EmployeeDetailsByHrmsId", "hrmsId",
        AuditListener.getLoggedUserId()).getRole().getId();
    RoleFunction rFunction = super.findNamedQueryResult(RoleFunction.class,
        "RoleFunction.Findduplicate", "roleId", roleId, "menuId", menuId,
        "function", funcId);
    if (rFunction == null)
      throw new BusinessServiceException("No Permission Found for you Role ");

    return getRolFunctionDto(rFunction);

  }

  private RoleFunctionDTO getRolFunctionDto(RoleFunction rFunction) {
    RoleFunctionDTO rfDto = new RoleFunctionDTO();
    rfDto.setId(rFunction.getId());
    rfDto.setCanAdd(rFunction.getCanAdd());
    rfDto.setCanAdjustVoucherPosting(rFunction.getCanAdjustVoucherPosting());
    rfDto.setCanDelete(rFunction.getCanDelete());
    rfDto.setCanEdit(rFunction.getCanEdit());
    rfDto.setCanExport(rFunction.getCanExport());
    rfDto.setCanSearch(rFunction.getCanSearch());
    rfDto.setCanPrint(rFunction.getCanPrint());
    return rfDto;
  }



}
