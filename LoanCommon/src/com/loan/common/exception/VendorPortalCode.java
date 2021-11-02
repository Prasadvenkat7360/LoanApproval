package com.loan.common.exception;

public enum VendorPortalCode implements ErrorCode
{

  SERVICE_TIMEOUT(301);

  private final int number;

  private VendorPortalCode(int number)
  {
    this.number = number;
  }

  @Override
  public int getNumber()
  {
    return number;
  }

}
