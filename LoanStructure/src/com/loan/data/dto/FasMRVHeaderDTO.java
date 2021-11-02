package com.loan.data.dto;

import java.math.BigDecimal;
import java.util.Date;

public class FasMRVHeaderDTO {
  public String MRVType;
  public int GRAID;
  public int DepotID;
  public int GRANO;
  public Date GRADate;
  public String PartyType;
  public String Partycode;
  public String PartyName;
  public String PartyPAN;
  public String PartyGSTN;
  public String PartyStatecode;
  public String BillNo;
  public Date BillDate;
  public String PurchaseType;
  public BigDecimal TotalAmount;
  public BigDecimal Cash_Discount;
  public BigDecimal Net_Payable;
  public String UserID;

  public int getGRAID() {
    return GRAID;
  }

  public void setGRAID(int gRAID) {
    GRAID = gRAID;
  }

  public int getDepotID() {
    return DepotID;
  }

  public void setDepotID(int depotID) {
    DepotID = depotID;
  }

  public int getGRANO() {
    return GRANO;
  }

  public void setGRANO(int gRANO) {
    GRANO = gRANO;
  }

  public Date getGRADate() {
    return GRADate;
  }

  public void setGRADate(Date gRADate) {
    GRADate = gRADate;
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

  public String getBillNo() {
    return BillNo;
  }

  public void setBillNo(String billNo) {
    BillNo = billNo;
  }

  public Date getBillDate() {
    return BillDate;
  }

  public void setBillDate(Date billDate) {
    BillDate = billDate;
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

  public String getMRVType() {
    return MRVType;
  }

  public void setMRVType(String mRVType) {
    MRVType = mRVType;
  }



}
