package com.loan.common.exception;

public enum JobCode implements ErrorCode
{

  INVALID_USER(201),
  INVALID_PORTAL(202),
  INVALID_REQUESR(203),
  DESIGN_APPROVE(204),
  CONTACT_ADMIN(205),
  NODATA_FOUND(206);  
  
  private final int number;

  private JobCode(int number)
  {
    this.number = number;
  }

  @Override
  public int getNumber()
  {
    return number;
  }

}
