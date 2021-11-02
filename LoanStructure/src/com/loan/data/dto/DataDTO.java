package com.loan.data.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonView;
import com.loan.data.dto.MapDTO.EmployeeRoleView;
import com.loan.data.dto.MapDTO.EmployeeView;
import com.loan.data.dto.MapDTO.MapDTOView;
import com.loan.data.dto.MapDTO.RoleView;

public class DataDTO implements Serializable {
  /**
   *
   */
  private static final long serialVersionUID = 1L;

  public static List<DataDTO> toList(final Map<String, String> dataTypeMap) {
    final List<DataDTO> dataDTOList = new ArrayList<>();
    for (final Map.Entry<String, String> entry : dataTypeMap.entrySet()) {
      dataDTOList.add(new DataDTO(entry.getKey(), entry.getValue()));
    }
    return dataDTOList;
  }

  @JsonView({MapDTOView.class, EmployeeRoleView.class, EmployeeView.class,RoleView.class})
  private String id;

  @JsonView({MapDTOView.class, EmployeeRoleView.class, EmployeeView.class,RoleView.class})
  private String name;

  @JsonView({MapDTOView.class, EmployeeRoleView.class, EmployeeView.class,RoleView.class})
  private String description;



  public DataDTO() {

  }

  public DataDTO(final DataDTO dto) {
    this.id = dto.id;
  }

  public DataDTO(final String key) {
    this.id = key;
  }

  public DataDTO(final String key, final String value) {
    this.id = key;
    this.name = value;
  }

  public DataDTO(final String key, final String value,
      final String description) {
    this.id = key;
    this.name = value;
    this.description = description;
  }

  public DataDTO(final String key, final String name, final String description,final String value) {
    this.id = key;
    this.name = name;
    this.description = description;
  }

  public String getDescription() {
    return this.description;
  }

  public String getId() {
    return this.id;
  }

  public String getName() {
    return this.name;
  }


  public void setDescription(final String description) {
    this.description = description;
  }

  public void setId(final String idKey) {
    this.id = idKey;
  }

  public void setName(final String name) {
    this.name = name;
  }

}
