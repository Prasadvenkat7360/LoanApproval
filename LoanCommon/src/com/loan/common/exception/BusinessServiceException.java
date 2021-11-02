package com.loan.common.exception;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ejb.ApplicationException;

/**
 * Service methods should throw this exception for any business validation failures.
 * Throwing this exception will result in transaction roll back.
 * 
 * @author Sriki
 */
@ApplicationException(rollback = true)
public class BusinessServiceException extends RuntimeException
{
  private static final long serialVersionUID = 1L;

  private BusinessServiceException causeBy = null;

  private ErrorCode errorCode;

  protected ArrayList<String> errorMessages;
  protected ArrayList<String> errorMessageDescriptors;

  protected Map<String, String> fieldMessages;

  public BusinessServiceException()
  {
    super();
  }

  public static BusinessServiceException wrap(Throwable exception, ErrorCode errorCode)
  {
    if (exception instanceof BusinessServiceException) {
      BusinessServiceException se = (BusinessServiceException) exception;
      if (errorCode != null && errorCode != se.getErrorCode()) {
        return new BusinessServiceException(exception.getMessage(), exception, errorCode);
      }
      return se;
    } else {
      return new BusinessServiceException(exception.getMessage(), exception, errorCode);
    }
  }

  public static BusinessServiceException wrap(Throwable exception)
  {
    return wrap(exception, null);
  }

  /*
   * public BusinessServiceException(String errorCode) {
   * super(errorCode);
   * this.errorCode = errorCode;
   * // addErrorMessage(message);
   * }
   */

  /*
   * public BusinessServiceException(BusinessServiceException causeBy) {
   * super(causeBy.getMessage());
   * this.causeBy = causeBy;
   * }
   */

  /*
   * public BusinessServiceException(ErrorCode errorCode, BusinessServiceException causeBy) {
   * super(errorCode);
   * // addErrorMessage(message);
   * this.errorCode = errorCode;
   * this.causeBy = causeBy;
   * }
   */

  public BusinessServiceException(ErrorCode errorCode)
  {
    this.errorCode = errorCode;
  }
  
  public BusinessServiceException(String message)
  {
    super(message);
    addErrorMessage(message);
  }

  public BusinessServiceException(String message, ErrorCode errorCode)
  {
    super(message);
    this.errorCode = errorCode;
  }

  public BusinessServiceException(Throwable cause, ErrorCode errorCode)
  {
    super(cause);
    this.errorCode = errorCode;
  }

  public BusinessServiceException(String message, Throwable cause, ErrorCode errorCode)
  {
    super(message, cause);
    this.errorCode = errorCode;
  }

  public ErrorCode getErrorCode()
  {
    return errorCode;
  }

  public BusinessServiceException setErrorCode(ErrorCode errorCode)
  {
    this.errorCode = errorCode;
    return this;
  }

  public BusinessServiceException getCauseBy()
  {
    return causeBy;
  }

  public void printStackTrace()
  {
    super.printStackTrace();
    if (causeBy != null) {
      System.err.println("Caused by:");
      causeBy.printStackTrace();
    }
  }

  public void printStackTrace(java.io.PrintStream ps)
  {
    super.printStackTrace(ps);
    if (causeBy != null) {
      ps.println("Caused by:");
      causeBy.printStackTrace(ps);
    }
  }

  public void printStackTrace(java.io.PrintWriter pw)
  {
    super.printStackTrace(pw);
    if (causeBy != null) {
      pw.println("Caused by:");
      causeBy.printStackTrace(pw);
    }
  }

  public void addErrorMessage(String message)
  {
    if (errorMessages == null) {
      errorMessages = new ArrayList<String>();
    }
    errorMessages.add(message);
  }

  public List<String> getErrorMessages()
  {
    return this.errorMessages;
  }

  public Map<String, String> getFieldMessages()
  {
    return fieldMessages;
  }

  @SuppressWarnings("unchecked")
  public <T> T get(String name)
  {
    return (T) fieldMessages.get(name);
  }

  public BusinessServiceException addFieldMessage(String fieldName, String fieldMessage)
  {
    if (this.fieldMessages == null) {
      this.fieldMessages = new HashMap<String, String>();
    }
    this.fieldMessages.put(fieldName, fieldMessage);
    return this;
  }

}
