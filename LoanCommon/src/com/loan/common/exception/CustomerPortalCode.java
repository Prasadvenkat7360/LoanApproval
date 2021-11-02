package com.loan.common.exception;

public enum CustomerPortalCode implements ErrorCode
{

  SERVICE_TIMEOUT(201);

  private final int number;

  private CustomerPortalCode(int number)
  {
    this.number = number;
  }

  @Override
  public int getNumber()
  {
    return number;
  }

}
