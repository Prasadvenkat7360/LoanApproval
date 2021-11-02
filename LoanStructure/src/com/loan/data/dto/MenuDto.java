package com.loan.data.dto;

import com.loan.data.dto.MapDTO.RoleView;
import com.loan.data.entity.Menu;

import com.fasterxml.jackson.annotation.JsonView;

public class MenuDto extends DTO {

  private static final long serialVersionUID = 1L;

  @JsonView({RoleView.class})
  private String menuName;
  
  @JsonView(RoleView.class)
  private String oeOrSale;

  public MenuDto() {
    super();
  }

  public MenuDto(Menu menu) {
    this.menuName = menu.getName();
    this.setId(menu.getId());
    this.oeOrSale=menu.getOeOrSale().toString();
  }

  public String getMenuName() {
    return menuName;
  }

  public void setMenuName(String menuName) {
    this.menuName = menuName;
  }

  public String getOeOrSale() {
    return oeOrSale;
  }

  public void setOeOrSale(String oeOrSale) {
    this.oeOrSale = oeOrSale;
  }

 

}
