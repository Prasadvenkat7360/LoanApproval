package com.loan.component.service;

import javax.ejb.Local;

import com.loan.data.dto.EmployeeDTO;
import com.loan.data.entity.Employee;

/**
 * @author Sriki
 * 
 */
@Local
public interface EmployeeLocal {

  Employee getEmployee(Employee m);

  EmployeeDTO authenticate(String hrmsId, String pwd);

  EmployeeDTO schedulerAuthenticate(String hrmsId, String pwd);

  Employee findByHrmsId(String hrmsId);

}
