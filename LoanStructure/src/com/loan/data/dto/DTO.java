package com.loan.data.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonView;
import com.loan.data.dto.MapDTO.EmployeeRoleView;
import com.loan.data.dto.MapDTO.EmployeeView;
import com.loan.data.dto.MapDTO.MapDTOView;
import com.loan.data.dto.MapDTO.RoleView;

/**
 * DTOs are used in place of Hibernate entities are used to transfer data
 * because they can be specialized to contain only the data that needs to be
 * transferred and no issues arise when dealing with lazily loaded relationships
 * because exactly the data requested is placed in the DTO.
 *
 * @author
 *
 */

abstract public class DTO implements Serializable {

  private static final long serialVersionUID = 1L;

  @JsonView({MapDTOView.class, EmployeeRoleView.class, EmployeeView.class,RoleView.class})
  private Long id;

  /**
   * Contains error messages to be sent back to client
   */
  private List<String> errorMessages;

  public DTO() {

  }

  public DTO(final DTO dto) {
    this.id = dto.id;

  }

  public DTO(final long id) {
    this.id = id;
  }

  /**
   * @return the errorMessages
   */
  public List<String> getErrorMessages() {
    return this.errorMessages;
  }

  public Long getId() {
    return this.id;
  }

  public void setErrorMessage(final String errorMessage) {
    if (this.errorMessages == null) {
      this.errorMessages = new ArrayList<>();
    }
    this.errorMessages.add(errorMessage);
  }

  /**
   * @param errorMessages the errorMessages to set
   */
  public void setErrorMessages(final List<String> errorMessages) {
    this.errorMessages = errorMessages;
  }

  public void setId(final Long id) {
    this.id = id;
  }

}
