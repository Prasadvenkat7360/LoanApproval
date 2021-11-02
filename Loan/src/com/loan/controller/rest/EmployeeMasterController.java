package com.loan.controller.rest;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.loan.common.exception.BusinessServiceException;
import com.loan.common.exception.OECode;
import com.loan.common.util.ResourceUtil;
import com.loan.component.service.EmployeeMasterLocal;
import com.loan.data.dto.MapDTO;

/**
 *
 * @author nageswara.rao
 *
 */

@RestController
public class EmployeeMasterController extends BaseController {

  final Logger logger =
      Logger.getLogger(EmployeeMasterController.class.getName());

  @Autowired
  EmployeeMasterLocal employeeMasterService;

  @RequestMapping(value = "/api/v1/FindRoleByPortal",
      method = RequestMethod.GET)
  @JsonView(MapDTO.EmployeeView.class)
  @ResponseStatus(HttpStatus.OK)
  public @ResponseBody MapDTO findPortalByRole(final HttpServletRequest request,
      @RequestParam final String storeorDc) {
    MapDTO resultDTO = new MapDTO();
    try {
      resultDTO.getPayload().put("Role",
          this.employeeMasterService.findPortalByRole(storeorDc));
    }
    catch (final BusinessServiceException bse) {
      this.logger.error(bse);
      String messageLoc = null;
      String resCode = null;
      if (bse.getErrorCode() != null) {
        resCode = "2";
        messageLoc = this.env
            .getProperty(ResourceUtil.getPropertyKey(bse.getErrorCode()));
        this.logger.error(messageLoc);
      }
      else {
        messageLoc = this.env
            .getProperty(ResourceUtil.getPropertyKey(OECode.CONTACT_ADMIN));
        resCode = "3";
      }
      resultDTO.setResCode(resCode);
      resultDTO.setMesgStr(messageLoc);
    }
    catch (final Exception ex) {
      ex.printStackTrace();
      this.handleExceptions(resultDTO, ex);
    }
    return resultDTO;

  }



}
