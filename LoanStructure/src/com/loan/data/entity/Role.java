package com.loan.data.entity;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import com.loan.data.dto.MapDTO.EmployeeView;
import com.loan.util.AuditListener;

/**
 * Entity implementation class for Entity: Role
 * 
 */
/**
 * @author venkata.prasad
 *
 */
@Entity
@Table(name = "ROLE")
@EntityListeners(value = AuditListener.class)
@NamedQueries({
    @NamedQuery(name = "Role.FindRoleForAll",
        query = "SELECT o FROM Role o where 1 = 1"),
    @NamedQuery(name = "Role.findROllByName",
        query = "SELECT o FROM Role o where o.name = :name"),
    /*@NamedQuery(name = "Role.FindRolesForSalesExecutives",
        query = "SELECT o FROM Role o where (o.isSalesExecutive=:isSalesExecutive OR o.isStoreHead=:isStoreHead OR o.isCashier=:isCashier OR o.isSupervisor=:isSupervisor) and o.company.id=:companyId"),*/
   })
public class Role extends AuditableEntity {

  private static final long serialVersionUID = 1L;

  @Id
  @JsonView({EmployeeView.class})
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "role_seq_id")
  @SequenceGenerator(name = "role_seq_id", sequenceName = "ROLE_SEQ",
      allocationSize = 1, initialValue = 1)
  @Column(name = "ID")
  private long id;

  @JsonView({EmployeeView.class})
  @Column(name = "NAME", length = 200, nullable = false)
  private String name;

  @JsonView({EmployeeView.class})
  @Column(name = "DESCRIPTION", length = 100, nullable = true)
  private String description;

  @OneToMany(cascade = {CascadeType.ALL}, fetch = FetchType.LAZY,
      mappedBy = "role")
  private Set<RoleFunction> roleFunctions = new HashSet<RoleFunction>();

  @JsonIgnore
  @JoinTable(name = "ROLE_MENU", joinColumns = {@JoinColumn(name = "ROLE_ID")},
      inverseJoinColumns = {@JoinColumn(name = "MENU_ID")})
  @ManyToMany(targetEntity = Menu.class, fetch = FetchType.LAZY,
      cascade = {CascadeType.PERSIST})
  @OrderBy("orderNo asc")
  private Collection<Menu> menu;

  public Role() {
    super();
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Set<RoleFunction> getRoleFunctions() {
    return roleFunctions;
  }

  public void setRoleFunctions(Set<RoleFunction> roleFunctions) {
    this.roleFunctions = roleFunctions;
  }

  public Collection<Menu> getMenu() {
    return menu;
  }

  public void setMenu(Collection<Menu> menu) {
    this.menu = menu;
  }

}
