package com.loan.component.service;

import java.util.List;

import javax.ejb.Local;

import com.loan.common.util.QueryFilter;
import com.loan.data.dto.DataDTO;
import com.loan.data.dto.FunctionDTO;
import com.loan.data.dto.RoleDTO;
import com.loan.data.dto.RoleFunctionDTO;
import com.loan.data.entity.Menu;
import com.loan.data.types.PortalType;

@Local
public interface RoleFunctionLocal {



  public List<Menu> findRole(String hrmsId);

  public void createRole(RoleDTO roleDto);

  public List<DataDTO> getMenu(PortalType module);

  public List<FunctionDTO> getFunctionByMneu(String menuId);

  public void updteRoleFunction(RoleDTO roleDTO);

  public Object getRoleDetaibyId(long id);

   Long getRoleSize(QueryFilter filter);

  public List<RoleDTO> getRoles(QueryFilter filter);

  public void deleteRoleFunction(long id);

  public RoleFunctionDTO findPermission(QueryFilter filter);
}
