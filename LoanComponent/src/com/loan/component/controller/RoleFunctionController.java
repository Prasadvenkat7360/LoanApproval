package com.loan.component.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.loan.common.exception.BusinessServiceException;
import com.loan.common.exception.OECode;
import com.loan.common.exception.SalesCode;
import com.loan.common.util.Constants;
import com.loan.common.util.QueryFilter;
import com.loan.common.util.ResourceUtil;
import com.loan.component.service.RoleFunctionLocal;
import com.loan.data.dto.DataDTO;
import com.loan.data.dto.FunctionDTO;
import com.loan.data.dto.MapDTO;
import com.loan.data.dto.RoleDTO;
import com.loan.data.dto.RoleFunctionDTO;
import com.loan.data.dto.MapDTO.RoleView;
import com.loan.data.entity.Menu;
import com.loan.data.types.Permission;
import com.loan.data.types.PortalType;

@RestController
public class RoleFunctionController extends BaseController {

  final Logger logger =
      Logger.getLogger(RoleFunctionController.class.getName());

  @Autowired
  private RoleFunctionLocal roleFunctionService;

  @RequestMapping(value = "/api/v1/getMenu", method = RequestMethod.GET)
  @JsonView({MapDTO.RoleView.class})
  @ResponseStatus(HttpStatus.OK)
  public @ResponseBody MapDTO getById(@RequestParam("hrmsId") String hrmsId) {
    MapDTO result = new MapDTO();
    try {
      List<Menu> menu = roleFunctionService.findRole(hrmsId);
      result.getPayload().put("Menu", menu);
    }
    catch (final BusinessServiceException bse) {
      this.logger.error(bse);
      String messageLoc = null;
      String resCode = null;

      if (bse.getMessage() != null) {
        resCode = "2";
        messageLoc = bse.getMessage();
        this.logger.error(messageLoc);
      }
      else {
        messageLoc = this.env
            .getProperty(ResourceUtil.getPropertyKey(SalesCode.CONTACT_ADMIN));
        resCode = "3";
      }
      result.setResCode(resCode);
      result.setMesgStr(messageLoc);
    }
    catch (final Exception ex) {
      this.handleExceptions(result, ex);
    }
    return result;

  }

  @RequestMapping(value = "/api/v1/createRole", method = RequestMethod.POST)
  @ResponseStatus(HttpStatus.OK)
  public @ResponseBody MapDTO createRole(@RequestBody RoleDTO roleDto) {
    MapDTO result = new MapDTO();
    try {
      roleFunctionService.createRole(roleDto);
      result.setMesgStr("Role Created SuccessFully");
    }
    catch (final BusinessServiceException bse) {
      this.logger.error(bse);
      String messageLoc = null;
      String resCode = null;

      if (bse.getMessage() != null) {
        resCode = "2";
        messageLoc = bse.getMessage();
        this.logger.error(messageLoc);
      }
      else {
        messageLoc = this.env
            .getProperty(ResourceUtil.getPropertyKey(SalesCode.CONTACT_ADMIN));
        resCode = "3";
      }
      result.setResCode(resCode);
      result.setMesgStr(messageLoc);
    }
    catch (final Exception ex) {
      this.handleExceptions(result, ex);
    }
    return result;

  }



  @RequestMapping(value = "/api/v1/findMenu", method = RequestMethod.GET)
  @JsonView(MapDTO.RoleView.class)
  @ResponseStatus(HttpStatus.OK)
  public @ResponseBody MapDTO findMenu(
      @RequestParam("portal") PortalType module) {
    MapDTO result = new MapDTO();
    try {
      List<DataDTO> menus = roleFunctionService.getMenu(module);
      result.getPayload().put("menus", menus);

    }
    catch (final BusinessServiceException bse) {
      this.logger.error(bse);
      String messageLoc = null;
      String resCode = null;

      if (bse.getMessage() != null) {
        resCode = "2";
        messageLoc = bse.getMessage();
        this.logger.error(messageLoc);
      }
      else {
        messageLoc = this.env
            .getProperty(ResourceUtil.getPropertyKey(SalesCode.CONTACT_ADMIN));
        resCode = "3";
      }
      result.setResCode(resCode);
      result.setMesgStr(messageLoc);
    }
    catch (final Exception ex) {
      this.handleExceptions(result, ex);
    }
    return result;

  }


  @RequestMapping(value = "/api/v1/findFunction", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @JsonView(RoleView.class)
  public @ResponseBody MapDTO findFunction(
      @RequestParam("menuId") String menuId) {
    MapDTO result = new MapDTO();
    try {
      List<FunctionDTO> functions =
          roleFunctionService.getFunctionByMneu(menuId);
      result.getPayload().put("functions", functions);

    }
    catch (final BusinessServiceException bse) {
      this.logger.error(bse);
      String messageLoc = null;
      String resCode = null;

      if (bse.getMessage() != null) {
        resCode = "2";
        messageLoc = bse.getMessage();
        this.logger.error(messageLoc);
      }
      else {
        messageLoc = this.env
            .getProperty(ResourceUtil.getPropertyKey(SalesCode.CONTACT_ADMIN));
        resCode = "3";
      }
      result.setResCode(resCode);
      result.setMesgStr(messageLoc);
    }
    catch (final Exception ex) {
      this.handleExceptions(result, ex);
    }
    return result;

  }


  @RequestMapping(value = "/api/v1/getPortal", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @JsonView(RoleView.class)
  public @ResponseBody MapDTO getPortal() {
    MapDTO result = new MapDTO();
    try {
      List<DataDTO> portal = DataDTO.toList(PortalType.getAllTypes());
      result.getPayload().put("portal", portal);

    }
    catch (Exception e) {
      e.printStackTrace();
    }
    return result;

  }


  @RequestMapping(value = "/api/v1/updateRoleFunction",
      method = RequestMethod.POST)
  @ResponseStatus(HttpStatus.OK)

  @JsonView(RoleView.class)
  public @ResponseBody MapDTO updateRoleFUnction(@RequestBody RoleDTO roleDTO) {
    MapDTO result = new MapDTO();
    try {
      roleFunctionService.updteRoleFunction(roleDTO);
      result.setResCode("1");

    }
    catch (final BusinessServiceException bse) {
      this.logger.error(bse);
      String messageLoc = null;
      String resCode = null;

      if (bse.getMessage() != null) {
        resCode = "2";
        messageLoc = bse.getMessage();
        this.logger.error(messageLoc);
      }
      else {
        messageLoc = this.env
            .getProperty(ResourceUtil.getPropertyKey(SalesCode.CONTACT_ADMIN));
        resCode = "3";
      }
      result.setResCode(resCode);
      result.setMesgStr(messageLoc);
    }
    catch (final Exception ex) {
      this.handleExceptions(result, ex);
    }
    return result;


  }



  @RequestMapping(value = "/api/v1/getpermissions", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  // @JsonView(MapDTO.class)
  public @ResponseBody MapDTO getPerMissions() {
    MapDTO result = new MapDTO();
    try {
      result.getPayload().put("portal", Permission.getAllTypes());

    }
    catch (final BusinessServiceException bse) {
      this.logger.error(bse);
      String messageLoc = null;
      String resCode = null;

      if (bse.getMessage() != null) {
        resCode = "2";
        messageLoc = bse.getMessage();
        this.logger.error(messageLoc);
      }
      else {
        messageLoc = this.env
            .getProperty(ResourceUtil.getPropertyKey(SalesCode.CONTACT_ADMIN));
        resCode = "3";
      }
      result.setResCode(resCode);
      result.setMesgStr(messageLoc);
    }
    catch (final Exception ex) {
      this.handleExceptions(result, ex);
    }
    return result;

  }


  @RequestMapping(value = "/api/v1/getRoleById", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @JsonView(MapDTO.RoleView.class)
  public @ResponseBody MapDTO findRoleById(@RequestParam("roleId") long id) {
    MapDTO result = new MapDTO();
    try {
      result.getPayload().put("roleFunction",
          roleFunctionService.getRoleDetaibyId(id));
    }
    catch (final BusinessServiceException bse) {
      this.logger.error(bse);
      String messageLoc = null;
      String resCode = null;

      if (bse.getMessage() != null) {
        resCode = "2";
        messageLoc = bse.getMessage();
        this.logger.error(messageLoc);
      }
      else {
        messageLoc = this.env
            .getProperty(ResourceUtil.getPropertyKey(SalesCode.CONTACT_ADMIN));
        resCode = "3";
      }
      result.setResCode(resCode);
      result.setMesgStr(messageLoc);
    }
    catch (final Exception ex) {
      this.handleExceptions(result, ex);
    }
    return result;
  }

  @RequestMapping(value = "/api/v1/searchRole", method = RequestMethod.POST)
  @JsonView({MapDTO.RoleView.class})
  @ResponseStatus(HttpStatus.OK)
  public @ResponseBody MapDTO searchRole(final HttpServletRequest request,
      @RequestBody final QueryFilter filter) {
    final MapDTO result = new MapDTO();
    try {
      this.roleFilter(filter);
      this.roleListing(result, filter);
    }
    catch (final BusinessServiceException bse) {
      this.handleExceptions(result, bse);
      logger.info(bse.getMessage());
      result.setResCode("3");
      result.setErrorMessage(OECode.CONTACT_ADMIN + "");
    }
    return result;
  }


  private void roleFilter(QueryFilter filter) {
    final Map<String, Object> fieldFilter = filter.getFieldFilters();
    List<String> list = new ArrayList<String>(fieldFilter.keySet());
    list.stream().forEach(key -> {
      if (key.equals("roleName")) {
        modifyFilter(filter, (String) fieldFilter.get(key), "description");
        fieldFilter.remove("roleName");
      }
      else if (key.equals("roleCode")) {
        modifyFilter(filter, (String) fieldFilter.get(key), "name");
        fieldFilter.remove("roleCode");
      }
    });

  }

  private void roleListing(MapDTO resultDto, QueryFilter filter) {
    List<RoleDTO> result = null;
    Long resultSize = this.roleFunctionService.getRoleSize(filter);
    if (0 < resultSize.longValue()) {
      filter.setOffset(filter.getOffset() * Constants.PAGE_SIZE);
      result = this.roleFunctionService.getRoles(filter);
      resultDto.getPayload().put("size", resultSize);
      resultDto.getPayload().put("list", result);
    }
    else {
      final String messageLoc = this.env
          .getProperty(ResourceUtil.getPropertyKey(OECode.NODATA_FOUND));
      resultDto.setMesgStr(messageLoc);
      resultDto.setResCode("2");
      this.logger.info(messageLoc);
    }

  }

  @RequestMapping(value = "/api/v1/deAssignFunction",
      method = RequestMethod.GET)
  @JsonView({MapDTO.RoleView.class})
  @ResponseStatus(HttpStatus.OK)
  public @ResponseBody MapDTO deAssignFunction(@RequestParam("rfId") long id) {
    final MapDTO result = new MapDTO();
    try {

      roleFunctionService.deleteRoleFunction(id);
    }
    catch (final BusinessServiceException bse) {
      this.handleExceptions(result, bse);
      logger.info(bse.getMessage());
      result.setResCode("3");
      result.setErrorMessage(OECode.CONTACT_ADMIN + "");
    }
    return result;
  }


  @RequestMapping(value = "/api/v1/getPermission", method = RequestMethod.POST)
  @JsonView({MapDTO.RoleView.class})
  @ResponseStatus(HttpStatus.OK)
  public @ResponseBody MapDTO getPermission(@RequestBody QueryFilter filter) {
    MapDTO result = new MapDTO();
    try {
     RoleFunctionDTO dto= roleFunctionService.findPermission(filter);
      result.getPayload().put("permission", dto);
    }
    catch (final BusinessServiceException bse) {
      this.logger.error(bse);
      String messageLoc = null;
      String resCode = null;

      if (bse.getMessage() != null) {
        resCode = "2";
        messageLoc = bse.getMessage();
        this.logger.error(messageLoc);
      }
      else {
        messageLoc = this.env
            .getProperty(ResourceUtil.getPropertyKey(SalesCode.CONTACT_ADMIN));
        resCode = "3";
      }
      result.setResCode(resCode);
      result.setMesgStr(messageLoc);
    }
    catch (final Exception ex) {
      this.handleExceptions(result, ex);
    }
    return result;

  }
  
  
}
