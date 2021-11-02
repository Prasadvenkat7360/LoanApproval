/**
 * 
 */
package com.loan.data.dto;

import com.fasterxml.jackson.annotation.JsonView;
import com.loan.data.dto.MapDTO.EmployeeRoleView;
import com.loan.data.dto.MapDTO.RoleView;
import com.loan.data.entity.Function;

/**
 * @author nageswara.rao
 *
 */
public class FunctionDTO extends DTO {

  private static final long serialVersionUID = 1L;

  @JsonView({EmployeeRoleView.class, RoleView.class})
  private String code;

  @JsonView({EmployeeRoleView.class, RoleView.class})
  private String description;

  @JsonView({EmployeeRoleView.class})
  private String menu;

  @JsonView(RoleView.class)
  private MenuDto menuDto;

  public FunctionDTO() {

  }

  public FunctionDTO(Function function) {
    this.code = function.getCode();
    this.description = function.getDescription();
    this.menu = function.getMenu();
    if (null != function.getMainMenu())
      this.menuDto = new MenuDto(function.getMainMenu());
  }

  public String getCode() {
    return this.code;
  }

  public String getDescription() {
    return this.description;
  }

  public String getMenu() {
    return this.menu;
  }

  public void setCode(final String code) {
    this.code = code;
  }

  public void setDescription(final String description) {
    this.description = description;
  }

  public void setMenu(final String menu) {
    this.menu = menu;
  }

  public MenuDto getMenuDto() {
    return menuDto;
  }

  public void setMenuDto(MenuDto menuDto) {
    this.menuDto = menuDto;
  }

}
