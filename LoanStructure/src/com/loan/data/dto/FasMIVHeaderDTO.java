package com.loan.data.dto;

import java.math.BigDecimal;

public class FasMIVHeaderDTO {
  public String PIMivType;
  public int PImivId;
  public int PIDepotID;
  public int PIMivNO;
  public String PIMivDate;
  public String PartyType;
  public String Partycode;
  public String PartyName;
  public String PartyPAN;
  public String PartyGSTN;
  public String PartyStatecode;
  public String PurchaseType;
  public BigDecimal TotalAmount;
  public BigDecimal Cash_Discount;
  public BigDecimal Net_Payable;
  public String UserID;

  public int getPImivId() {
    return PImivId;
  }

  public void setPImivId(int pImivId) {
    PImivId = pImivId;
  }

  public int getPIDepotID() {
    return PIDepotID;
  }

  public void setPIDepotID(int pIDepotID) {
    PIDepotID = pIDepotID;
  }

  public int getPIMivNO() {
    return PIMivNO;
  }

  public void setPIMivNO(int pIMivNO) {
    PIMivNO = pIMivNO;
  }

  public String getPIMivDate() {
    return PIMivDate;
  }

  public void setPIMivDate(String pIMivDate) {
    PIMivDate = pIMivDate;
  }

  public String getPartyType() {
    return PartyType;
  }

  public void setPartyType(String partyType) {
    PartyType = partyType;
  }

  public String getPartycode() {
    return Partycode;
  }

  public void setPartycode(String partycode) {
    Partycode = partycode;
  }

  public String getPartyName() {
    return PartyName;
  }

  public void setPartyName(String partyName) {
    PartyName = partyName;
  }

  public String getPartyPAN() {
    return PartyPAN;
  }

  public void setPartyPAN(String partyPAN) {
    PartyPAN = partyPAN;
  }

  public String getPartyGSTN() {
    return PartyGSTN;
  }

  public void setPartyGSTN(String partyGSTN) {
    PartyGSTN = partyGSTN;
  }

  public String getPartyStatecode() {
    return PartyStatecode;
  }

  public void setPartyStatecode(String partyStatecode) {
    PartyStatecode = partyStatecode;
  }

  public String getPurchaseType() {
    return PurchaseType;
  }

  public void setPurchaseType(String purchaseType) {
    PurchaseType = purchaseType;
  }

  public BigDecimal getTotalAmount() {
    return TotalAmount;
  }

  public void setTotalAmount(BigDecimal totalAmount) {
    TotalAmount = totalAmount;
  }

  public BigDecimal getCash_Discount() {
    return Cash_Discount;
  }

  public void setCash_Discount(BigDecimal cash_Discount) {
    Cash_Discount = cash_Discount;
  }

  public BigDecimal getNet_Payable() {
    return Net_Payable;
  }

  public void setNet_Payable(BigDecimal net_Payable) {
    Net_Payable = net_Payable;
  }

  public String getUserID() {
    return UserID;
  }

  public void setUserID(String userID) {
    UserID = userID;
  }
  public String getPIMivType() {
    return PIMivType;
  }

  public void setPIMivType(String pIMivType) {
    PIMivType = pIMivType;
  }

}
