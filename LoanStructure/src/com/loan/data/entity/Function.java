package com.loan.data.entity;

import java.io.Serializable;
import java.util.Collection;
import java.util.Map;
import java.util.TreeMap;
import java.util.TreeSet;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonView;
import com.loan.data.dto.MapDTO.EmployeeRoleView;
import com.loan.data.dto.MapDTO.MapDTOView;
import com.loan.data.dto.MapDTO.RoleView;
import com.loan.data.entity.Employee.ResultView;

/**
 * Entity implementation class for Entity: Function
 *
 */
/**
 * @author venkata.prasad
 *
 */
@Entity
@Table(name = "FUNCTION")
@NamedQueries({@NamedQuery(name = "Function.FindSubFunction",
    query = "SELECT o FROM Function o where o.parentFunction.id = :paId and o.id in(:id) order by o.orderNo ASC"),

    @NamedQuery(name = "Function.FindFinctionbyMenu",
        query = "SELECT o FROM Function o where o.mainMenu.Id in (:menuId) order by o.orderNo ASC")

})
public class Function implements Serializable, Comparable<Function> {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE,
      generator = "function_seq_id")
  @SequenceGenerator(name = "function_seq_id", sequenceName = "FUNCTION_SEQ",
      allocationSize = 1,initialValue = 1)
  @JsonView(EmployeeRoleView.class)
  @Column(name = "ID")
  private long id;

  @JsonView({MapDTOView.class, EmployeeRoleView.class})
  @Column(name = "CODE", length = 50, nullable = false)
  private String code;

  @JsonView({ResultView.class, MapDTOView.class, EmployeeRoleView.class,
      RoleView.class})
  @Column(name = "DESCRIPTION", length = 200, nullable = true)
  private String description;

  @JsonView({EmployeeRoleView.class})
  @Column(name = "MENU", length = 200, nullable = true)
  private String menu;

  @Column(name = "URL")
  @JsonView(RoleView.class)
  private String url;

  @ManyToOne(cascade = {CascadeType.DETACH}, fetch = FetchType.LAZY,
      optional = true)
  @JoinColumn(name = "PARENT_FUNCTION_ID")
  private Function parentFunction;

  @JoinTable(name = "ROLE_MENU", joinColumns = {@JoinColumn(name = "MENU_ID")},
      inverseJoinColumns = {@JoinColumn(name = "ROLE_ID")})
  @ManyToMany(targetEntity = Role.class, fetch = FetchType.LAZY,
      cascade = {CascadeType.PERSIST})
  private Collection<Role> roles;


  @ManyToOne(cascade = {CascadeType.DETACH}, fetch = FetchType.LAZY,
      optional = true)
  @JoinColumn(name = "MENU_ID")
  private Menu mainMenu;

  /*
   * this functions used to populate based on menu
   */
  @Transient
  @JsonView(RoleView.class)
  private Map<Function, TreeSet<Function>> subfunc = new TreeMap<>();

  @Column(name = "orderNo")
  private Long orderNo;

  public Function() {
    super();
  }



  public Function(long id) {
    super();
    this.id = id;
  }



  public String getCode() {
    return this.code;
  }

  public String getDescription() {
    return this.description;
  }

  public long getId() {
    return this.id;
  }

  public String getMenu() {
    return this.menu;
  }

  public Function getParentFunction() {
    return this.parentFunction;
  }

  public void setCode(final String code) {
    this.code = code;
  }

  public void setDescription(final String description) {
    this.description = description;
  }

  public void setId(final long id) {
    this.id = id;
  }

  public void setMenu(final String menu) {
    this.menu = menu;
  }

  public void setParentFunction(final Function parentFunction) {
    this.parentFunction = parentFunction;
  }


  public String getUrl() {
    return url;
  }

  public void setUrl(String url) {
    this.url = url;
  }

  public Collection<Role> getRoles() {
    return roles;
  }

  public void setRoles(Collection<Role> roles) {
    this.roles = roles;
  }

  public Menu getMainMenu() {
    return mainMenu;
  }

  public void setMainMenu(Menu mainMenu) {
    this.mainMenu = mainMenu;
  }

  public Map<Function, TreeSet<Function>> getSubfunc() {
    return subfunc;
  }

  public void setSubfunc(Map<Function, TreeSet<Function>> subfunc) {
    this.subfunc = subfunc;
  }



  /*
   * if (m1.getRating() < m2.getRating()) return -1; if (m1.getRating() >
   * m2.getRating()) return 1; else return 0;
   * 
   * @Override public int compareTo(Function o) { if (null !=
   * o.getParentFunction() && o.getParentFunction().getDescription()
   * .trim().compareTo(o.getParentFunction().getDescription().trim()) < 0)
   * return 0; else return 1; }
   */

  public Long getOrderNo() {
    return orderNo;
  }



  public void setOrderNo(Long orderNo) {
    this.orderNo = orderNo;
  }



  @Override
  public int compareTo(Function fn) {

   if( orderNo.compareTo(fn.getOrderNo())<0)
     return -1;
   else
     return 1;


  }


}
