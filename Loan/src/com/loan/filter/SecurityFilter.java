package com.loan.filter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;

import com.loan.common.util.Constants;
import com.loan.data.dto.EmployeeDTO;
import com.loan.util.AuditListener;

@WebFilter("/*")
public class SecurityFilter implements Filter {

  @Override
  public void destroy() {}

  @Override
  public void doFilter(final ServletRequest servletRequest,
      final ServletResponse servletResponse, final FilterChain chain)
      throws IOException, ServletException {
    if (servletRequest instanceof HttpServletRequest) {
      ((HttpServletRequest) servletRequest).getRequestURL().toString();

      final EmployeeDTO loggedUser =
          (EmployeeDTO) ((HttpServletRequest) servletRequest).getSession()
              .getAttribute(Constants.USER_TOKEN);
      if (loggedUser != null) {
        final Map<String, Object> empDetails = new HashMap<>();
        empDetails.put(Constants.ID_TOKEN, loggedUser.getEmpId());
        empDetails.put(Constants.EMP_ID_TOKEN, loggedUser.getHrms_id());
        empDetails.put(Constants.STORE_ID_TOKEN, loggedUser.getStoreId());
        empDetails.put(Constants.COMPANY_ID_TOKEN, loggedUser.getCompanyId());
        empDetails.put(Constants.GROUP_ID_TOKEN, loggedUser.getGroupId());
        empDetails.put(Constants.BUSINESS_ID_TOKEN, loggedUser.getBusinessId());
        empDetails.put(Constants.ZONE_ID_TOKEN, loggedUser.getZoneId());
        empDetails.put(Constants.SUPERVISOR_ID_TOKEN, loggedUser.getSuperVisorId());
        empDetails.put(Constants.ROLE_NAME_TOKEN, loggedUser.getRoleName());
        empDetails.put(Constants.DC_ID_TOKEN, loggedUser.getDcId());
        empDetails.put(Constants.REGION_ID_TOKEN, loggedUser.getRegionId());
        empDetails.put(Constants.STATE_ID_TOKEN, loggedUser.getStateId());



        // add to the thread local variable so that these details are
        // available in method calls
        AuditListener.setAuditUserDetail(empDetails);

      }

    }


    chain.doFilter(servletRequest, servletResponse);
  }

  @Override
  public void init(final FilterConfig arg0) throws ServletException {}

}
