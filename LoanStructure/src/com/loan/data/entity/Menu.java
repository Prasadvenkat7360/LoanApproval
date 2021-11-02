package com.loan.data.entity;

import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonView;
import com.loan.data.dto.MapDTO.RoleView;
import com.loan.data.types.PortalType;

/**
 * @author venkata.prasad
 *
 */
@Entity
@Table(name = "MENU")
@NamedQueries({@NamedQuery(name = "Menu.FindByModule",
    query = "SELECT m FROM Menu m where m.oeOrSale=:oeOrSale")

})
public class Menu extends AuditableEntity {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "menu_seq_id")
  @SequenceGenerator(name = "menu_seq_id", sequenceName = "MENU_SEQ",
      allocationSize = 1,initialValue = 1)
  @Column(name = "ID")
  private Long Id;

  @JsonView(RoleView.class)
  @Column(name = "MENU_NAME")
  private String name;

  @Column(name = "PORTAL_TYPE")
  @Enumerated(EnumType.STRING)
  private PortalType oeOrSale;

  @JsonView(RoleView.class)
  @OneToMany(fetch = FetchType.LAZY, mappedBy = "menu",
      cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
  private List<RoleFunction> roleFunctions;

  /*
   * list of function used to populate based on menu
   */
  @Transient
  private Set<Function> fuList = new TreeSet<>();

  @JoinTable(name = "ROLE_MENU")
  @ManyToMany(targetEntity = Menu.class, fetch = FetchType.LAZY,
      cascade = {CascadeType.PERSIST})
  private Collection<Role> roles;


  @Column(name="orderNo")
  private Long orderNo;
  
  public Menu() {
    super();
  }



  public Menu(Long id) {
    super();
    Id = id;

  }



  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }


  public Long getId() {
    return Id;
  }

  public void setId(Long id) {
    Id = id;
  }

  public Collection<Role> getRoles() {
    return roles;
  }

  public void setRoles(Collection<Role> roles) {
    this.roles = roles;
  }

  public List<RoleFunction> getRoleFunctions() {
    return roleFunctions;
  }

  public void setRoleFunctions(List<RoleFunction> roleFunctions) {
    this.roleFunctions = roleFunctions;
  }



  public Set<Function> getFuList() {
    return fuList;
  }



  public void setFuList(Set<Function> fuList) {
    this.fuList = fuList;
  }



  public PortalType getOeOrSale() {
    return oeOrSale;
  }


  public void setOeOrSale(PortalType oeOrSale) {
    this.oeOrSale = oeOrSale;
  }



  public Long getOrderNo() {
    return orderNo;
  }


  public void setOrderNo(Long orderNo) {
    this.orderNo = orderNo;
  }

  


}
