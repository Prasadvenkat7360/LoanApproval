package com.loan.common.util;

import java.math.BigDecimal;

public class Constants {
  public static final int PAGE_SIZE = 20;
  public static final String USER_TOKEN = "LoggedInUser";
  public static final String ID_TOKEN = "E_ID";
  public static final String EMP_ID_TOKEN = "EMP_HRMS_ID";
  public static final String STORE_ID_TOKEN = "STORE_ID";
  public static final String DC_ID_TOKEN = "DC_ID";
  public static final String REGION_ID_TOKEN = "REGION_ID";
  public static final String STATE_ID_TOKEN = "STATE_ID";
  public static final String COMPANY_ID_TOKEN = "COMPANY_ID";
  public static final String BUSINESS_ID_TOKEN = "BUSINESS_ID";
  public static final String GROUP_ID_TOKEN = "GROUP_ID";
  public static final String ZONE_ID_TOKEN = "ZONE_ID";
  public static final String SUPERVISOR_ID_TOKEN = "SUPERVISOR_ID";
  public static final String ROLE_NAME_TOKEN = "ROLE_NAME";
  public static final String SEGMENTS_TOKEN = "segmentIds";
  public static final String METALS_TOKEN = "metalIds";
  public static final String HSN_CODES = "hsnCodeList";


  // Order Header Constants
  public static final String OCCASSION = "occassion";
  public static final String INTIMATION_MODE = "intMode";
  public static final String INTIMATION = "intimation";
  public static final String PRINT_NAME_IN_BILL = "pniBill";
  public static final String ORDER_STATUS = "oStatus";
  public static final String ORDER_DATE = "oDate";
  public static final String OCCASSION_DATE = "ocnDate";
  public static final String ORDERKIND = "oKind";
  public static final String ORDER_LINE_ITEMS = "OLineItems";
  public static final String ORDER_HEADER = "oHeader";
  public static final String METAL_RATES = "mRates";

  // Order Line Item Constants
  public static final String METAL_TYPES = "mTypes";
  public static final String SEGMENT_TYPES = "sTypes";
  public static final String METAL_JEWEL_TYPES = "mjTypes";
  public static final String DUE_DATE_TYPES = "ddTypes";
  public static final String METAL_WEIGHT_TYPES = "mvTypes";
  public static final String METAL_TYPE_ID = "metalId";
  public static final String SEGMENT_TYPE_ID = "segId";
  public static final String METAL_DESC = "mCode";
  public static final String METAL_PURITY_ID = "metalPurityId";
  public static final String METAL_JEWEL_TYPE_ID = "mJewelId";
  public static final String STORE_ID = "storeId";
  public static final String VENDOR_TYPE = "vType";
  public static final String VENDOR_SEARCH_CODE = "vSearchCode";
  public static final String CATEGORY_ID = "catId";
  public static final String VENDOR_CODE_LIST = "vCodeList";
  public static final String MAIN_CATEGORY_LIST = "mainCatList";
  public static final String SUB_CATEGORY_LIST = "subCatList";
  public static final String HSN_CODE_LIST = "hsnCodeList";
  public static final String VENDOR_ARTICLE_LIST = "vArticleCodeList";
  public static final String VENDOR_ARTICLE = "vArticleCode";
  public static final String SEGMENT_METALCOLOR_LIST = "segMetalColors";
  public static final String SUB_CATEGORY_ID = "sCatId";
  public static final String SHAPE_ID = "shapeId";
  public static final String SE_USERS = "seUsers";
  public static final String VENDOR_ID = "vId";
  public static final String VENDORS = "vendors";
  public static final String METAL_WEIGHT_TYPE = "mvType";
  public static final String DIAMOND = "D";
  public static final String GOLD = "G";
  public static final String SILVER = "S";
  public static final String PLATINUM = "P";
  public static final String DIAMOND_STONE = "DI";
  public static final String ARTICLE_CODE = "articleCode";
  public static final String COST_BORNE_BY = "costToBeBorneBy";

  // Cashier order confirmation
  public static final String CONFIRMED_ORDERS = " are successfully confirmed";

  // Order Line Item Metal properties
  public static final String METAL_PROPERTIES = "mProp";
  public static final String SEGMENT_MELTING_PURITY_LIST = "meltP";
  public static final String SEGMENT_SKIN_PURITY_LIST = "skinP";

  // Order Line Item Attributes
  public static final String METAL_ATTRIBUTES = "mAttributes";
  public static final String LENGTH_LBL = "length|Length";
  public static final String NK_BK_LENGTH_LBL = "length|NK+Back Chain Length";
  public static final String JW_NK = "NK";
  public static final String JW_NC = "NC";
  public static final String HEIGHT_LBL = "height|Height";
  public static final String WIDTH_LBL = "width|Width";
  public static final String DIAMETER_LBL = "diameter|Diameter";
  public static final String SETTING_TYPE_LBL = "settingType|Setting Type";
  public static final String COLLECTION_NAME_LBL =
      "collectionName|Collection Name";
  public static final String SIZE_LBL = "size|Size";
  public static final String SCREW_TYPE_LBL = "screwType|Screw Type";
  public static final String HOOK_TYPE_LBL = "hookType|Hook Type";
  public static final String POLISH_TYPE_LBL = "polishType|Polish Type";
  public static final String LOOP_TYPE_LBL = "loopType|Loop Type";
  public static final String STONE_COMBINATION_LBL = "combination|Combination";

  // Order Line Item Design
  public static final String DESIGN_DETAILS = "dDetails";
  public static final String DESIGN_BY = "designBy";
  public static final String DESIGN_INT_MODE = "dIntMode";
  public static final String DESIGN_STATUS = "dStatus";
  public static final String DESIGNERS = "designers";
  public static final String DESIGNER = "Designer";
  public static final String NONE = "NONE";

  // Local transfer voucher
  public static final String TV_ACKNOWLEDGED =
      " Transfer Vouchers are successfully Acknowledged";
  // public static final String SCREW_TYPE = "ASCREWT";
  // public static final String HOOK_TYPE = "AHOOKT";
  // public static final String POLISH_TYPE = "APOLISH";
  // public static final String LOOP_TYPE = "ALOOPT";

  // Receipt Voucher Constants
  public static final String PAYMENTREFTYPE = "C";
  public static final String VOUCHERSTATUS = "C";

  public static final String DOCTYPE = "docType";
  public static final String DOCNO = "docNo";
  public static final String DOCAmount = "docAmount";

  // Order Save Module
  public static final String CUSTOMER_ORDER_TYPE = "customerOrder";
  public static final String CUSTOMER_ID = "CustomerID";
  public static final String CUSTOMER_OBJ = "customer";
  public static final String LOGGEDINUSER = "loggedInUser";
  public static final String FAILURE = "Failure";

  // Order Accessory Module
  public static final String ACCESSORY_HEADER = "accHeader";
  public static final String SUPPLIED_BY = "suppliedBy";

  public static final String ACCESSORY_CATEGORY = "accCats";
  public static final String ACCESSORY_SUB_CATEGORY = "accSubCats";
  public static final String UOM = "uom";
  public static final String ACCESSORY_MAIN_CATEGORY_ID = "accMCatId";
  public static final String ACCESSORY_CODE = "accCode";
  public static final String ACCESSORY_TYPE = "AC";
  public static final String CAT_CODE = "catCode";
  public static final String SUB_CAT_CODE = "subCatCode";
  public static final String METAL_TYPE_CODE = "mCode";
  public static final String CONDITION = "condition";

  // Order Stone Module
  public static final String STONE_SEGMENT = "stoneSeg";
  public static final String STONE_CATEGORY = "stoneCats";
  public static final String STONE_SEG_ID = "sSegId";
  public static final String STONE_CAT_ID = "sCatId";
  public static final String SHAPES_LIST = "shapes";
  public static final String STONE_SEG_CODE = "sSeg";
  public static final String SHAPE_CODE = "shapeCode";
  public static final String STONE_DETAILS = "stoneDetails";
  public static final String STONE_SUB_CAT = "stoneSubCategory";
  public static final String STONE_COLOR = "color";
  public static final String STONE_CLARITY = "clarity";
  public static final String STONE_WEIGHTSLAB = "weightSlab";
  public static final String STONE_CUTGRADE = "cutGrade";
  public static final String STONE_ACTUAL_COLOR = "actualColor";
  public static final String STONE_UOM = "uom";
  public static final String STONE_ID = "stoneId";
  public static final String SELLINGRATE = "rateList";

  // Pending Orders
  public static final String SALESEXECUTIVE = "salesExecutive";
  public static final String ID = "id";

  // ValuationSlip

  public static final String PURPOSTE = "purpose";
  public static final String ITEM_TYPES = "itemType";
  public static final String LOCATION = "location";
  public static final String JEWEL_TYPE = "jewelType";
  public static final String MAINCATEGORY = "mCategory";
  public static final String SUBCATEGORY = "sCategory";
  public static final String STONECODE = "sCode";
  public static final String MATERIALTYPE = "mType";
  public static final String COMPANY_NONCOMPANY = "company";
  public static final String VSLIPSERIALNO = "vSlipSerialNo";
  public static final String VSLIPID = "vSlipId";
  public static final String PURITY = "purity";
  public static final BigDecimal ESTIMATED_PURITY = new BigDecimal(99.90);
  public static final String CREDIT_WEIGHT_PURITY = "CREDIT_WEIGHT_PURITY";
  public static final String VALUATIN_PRICE = "vPriceDetails";

  public static final BigDecimal G_22_KARAT = new BigDecimal(92.00);
  public static final BigDecimal G_18_KARAT = new BigDecimal(76.00);
  public static final BigDecimal P_95 = new BigDecimal(95.00);
  public static final BigDecimal S_87 = new BigDecimal(87.00);
  public static final BigDecimal S_999 = new BigDecimal(99.90);
  public static final BigDecimal PURITY_99_9 = new BigDecimal(99.90);
  public static final BigDecimal PURITY_99_5 = new BigDecimal(99.5);
  public static final BigDecimal PURITY_100 = new BigDecimal(100.00);

  public static final String ORDER_RATE_CONFIRMATION_DAYS =
      "ORDER_RATE_CONFIRMATION_DAYS";
  public static final String EVALUATED = "Evaluated";
  public static final String UPLOAD_FILE_PATH = "UPLOAD_FILE_PATH";

  public static final String ROLE_VALUATOR = "Valuator";
  public static final String VALUATION_SLIP_STATUS = "status";

  // OrderExecution
  public static final String ORDER_TYPES = "orderTypes";
  public static final String STORE_CODES = "storeCodes";
  public static final String JW_TYPES = "JwTypes";
  public static final String ORDER_UNIT = "orderUnit";
  public static final String ACTIVE_YN = "activeYN";
  public static final String ARTICLE_FLAG = "articleFlag";
  public static final String MUP_CATEGORY = "mupCategory";//

  public static final String EXTERNAL = "External";
  public static final String INTERNAL = "Internal";
  public static final String ACTION = "action";
  public static final String COMPLEXITY = "complexity";
  public static final String DATE_FORMAT_DDMMYYYY = "dd/MM/yyyy";
  public static final String JSON_DATE_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";

  public static final String DESIGN_SEARCH_PAGE = "DesignSearch";
  public static final String DESIGN_REVIEW_APPROVE_PAGE = "DesignRevApprove";
  public static final String DESIGN_UPLOAD_PAGE = "DesignRevApprove";

  // Order confirmation
  public static final String CASHIER = "Cashier";
  public static final String STORE_HEAD = "Store Head";

  // SE Design confirmation
  public static final String DESIGN_ID = "designId";

  // OE Material Issue Voucher
  public static final String MIVTYPES = "mivTypes";
  public static final String MRVTYPES = "mrvTypes";
  public static final String MRV_STATUS = "mrvStatus";
  public static final String SYS_DATE = "sysDate";

  public static final String MIV_DTO = "mivDTO";
  public static final String PST_DETAILS = "psrDetails";
  public static final String STONE_TYPE = "stoneType";
  public static final String OPEN_PSR_LIST = "psrList";

  // Cashier Reconciliation Sucess msg
  public static final String RECON_SUCESS =
      " Cash Reconciliation saved sucessfully";

  // Manual Transit
  public static final String STOREORDCTYPE = "storeOrDCType";
  public static final String DCID = "dcId";
  public static final String ORDERID = "orderId";
  public static final String TRANSIT_REFTYPE = "referenceType";
  public static final String TRANSIT_TYPE = "transitItemType";
  public static final String ZONE_TYPE = "zoneType";
  public static final String TO_STORE_OR_DC_ID = "toStoreOrDCId";
  public static final String TO_STORE_OR_DC_TYPE = "toStoreOrDCType";
  public static final String TRANSIT_TYPE_SEL = "transitType";

  public static final String ALL_STORES = "allStores";
  public static final String ALL_DC = "allDc";
  public static final String ALL_ZONE_FOR_STORE = "allZoneForStores";
  public static final String ALL_ZONE_FOR_DC = "allZoneForDc";

  public static final String TRANSIT_CREATED =
      " Transit are successfully created";

  public static final String CASHIER_SAVE_SUCESS =
      " Cashier To Cashier TV Created Successfully. TV ID is :";

  public static final String CASHIER_CANCEL_SUCESS =
      " Selected Cashier To Cashier TVs are canceled successfully";

  public static final String CASHIER_ACKNOWLEDGE_SUCESS =
      " Cashier To Cashier TV Acknowledged Successfully. TV ID is :";

  // Sent Parcel

  public static final String PARCEL_STATUS = "parcelStatus";
  public static final String COURIERS = "couriers";
  public static final String MIV_LIST = "mivList";
  public static final String PARCEL_LIST = "parcelList";
  public static final String PARCEL_DELVIERY_MODE = "parcelDelvieryMode";
  public static final String COST_BY = "costBy";
  public static final String EMPLOYEE = "employee";

  // Melting

  // zone

  public static final String DC_NAME = "dcname";

  public static final String SEGMENTS = "segements";
  public static final String MELTING_LIST = "meltingList";
  public static final String ASSAYER_CERT = "asayerCert";
  public static final String REFINER_LIST = "refinerist";
  // Indent

  public static final String CONFIRMATION = "confirmation";
  public static final String DELIVERY_TYPE = "deliveryType";

  public static final String DELIVERY_STATUS = "deliveryStatus";

  public static final String ADDRESS = "address";

  public static final String BULLION_DEALERS = "bDealers";

  public static final String STATUS = "status";

  // pure metal locations
  public static final String PURE_GOLD_LOCATION = "PGD";
  public static final String PURE_SILVER_LOCATION = "PSL";
  public static final String PURE_PLATINUM_LOCATION = "PPT";

  public static final String CASH_DEPOSIT_SAVE_SUCESS =
      "Cash Deposit Challan Created Successfully. Deposit Challan ID is :";

  // MRV
  public static final String STONE_CONDITION = "sCondition";
  public static final String ACC_CONDITION = "aCondition";

  public static final String CHEQUE_DEPOSIT_SAVE_SUCESS =
      "Cheque Deposit Challan Created Successfully. Deposit Challan ID is :";

  public static final String NEW_CHEQUE_NUM_UPDATE =
      "Cheque number updated Successfully to ";

  public static final String GIFT_VOUCHER_AGREEMENT_SUCESS =
      "Gift Voucher Agreement Created Successfully. Agreement ID is :";

  public static final String GV_AGREEMENT_UPDATE =
      "Gift Voucher Agreement updated Successfully. Gift Voucher Agreement ID is :";

  public static final String PARCEL_ID = "parcelId";
  public static final String VENDOR_CODE = "vendorCode";
  public static final String VENDOR_NAME = "vendorName";

  public static final String MODE = "mode";

  public static final String GIFT_VOUCHER_SAVE_SUCESS =
      "Gift Voucher Created Successfully. Gift Voucher ID is :";

  public static final String VENDOR_TAX_TYPES = "VendorTaxTypes";

  // METAL RATE
  public static final String REGION_LOV = "REGION_LOV";
  public static final String STORE_LOV = "STORE_LOV";
  public static final String METAL_SEGMENT_LOV = "METAL_SEGMENT_LOV";
  public static final String METAL_PURITY_LOV = "METAL_PURITY_LOV";
  public static final String SEARCH_METAL_RATE_RESULT =
      "SEARCH_METAL_RATE_RESULT";
  public static final String FETCH_HALL_MARK_MIV_NOs = "getMIVNumbers";
  public static final String FETCH_HALL_MARK_MIV_SRLNOs = "getMIVSrlNumbers";

  public static final String FETCH_HALL_MARK_MIV_DETAILS = "getMIVSrlNoDetails";
  // Vendor Cost Maintenance
  public static final String MC_CHARGES_TYPE = "mcChargesType";
  public static final String WASTAGE_TYPE = "wastageType";
  public static final String METAL_SKIN_PURITY = "metalSkinPurity";
  public static final String MUP_ = "MUP_";
  public static final String TABLE_REFS = "tableRefList";
  public static final String VCM_LISTING = "listing";
  public static final String VCM_CREATE = "create";
  public static final String VCM_EDIT = "edit";
  public static final String VCM_LISTING_SEARCH_SIZE = "vcmListingSearchSize";

  public static final String CONFIRMED_RECONCILATIONS =
      " are successfully confirmed";

  // Savings Plan
  public static final String SCHEME_NAME_LIST = "schemeList";
  public static final String SCHEME_INT_MODE = "intMode";
  public static final String SCHEME_TYPE = "schemeType";
  public static final String PLAN_PERIOD = "planPeriod";
  public static final String INSTALLMENT_AMOUNT = "installmentAmt";
  public static final String BENEFIT_RATE = "benefitRate";
  public static final String BONUS_BENEFIT_RATE = "bonusBenefitRate";
  public static final String SAVINGS_PLAN_SAVE_SUCCESS =
      "Successfully Savings Plan was Created with the ID #";
  public static final String SAVINGS_START_DATE = "startDate";
  public static final String SAVINGS_PLAN = "savingsPlan";
  public static final String SAVINGS_PLAN_DETAILS = "savingsPlanDetails";
  public static final String PDC_SAVE_SUCCESS =
      "Successfully PDC was created for Savings Plan #";
  public static final String PDC_DETAIL = "pdcDetail";
  public static final String VENDOR_CITY = "vCity";
  public static final String VENDOR_COUNTRY = "vCountry";
  public static final String VENDOR_BLOCKED = "vBlocked";
  public static final String VENDOR_STATE = "vState";
  public static final String INIT_PAGE = "initializePage";
  public static final String SEARCH = "search";
  public static final String CREATE = "create";
  public static final String VENDOR_AGREEMENT_UPLOADED = "vAgreementUploaded";
  public static final String CREATED_BY = "createdBy";
  public static final String UPDATE = "update";

  public static final String VENDOR_COST = "vendorCost";
  public static final String SAVINGS_PLAN_PDC_NOTFOUND =
      "There are no PDC Cheque available for Return in Savings Plan No: ";
  public static final String SAVINGS_PLAN_RECEIPT_VOUCHER =
      "Cannot Create Receipt Voucher.All the Installments are Paid for Savings Plan No: ";
  public static final String SAVINGS_PLAN_INSTALL_PAID_01 =
      "All the Installments are Paid for Savings Plan No: ";
  public static final String SAVINGS_PLAN_INSTALL_PAID_02 =
      ".PDC Cheque cannot be accepted.";
  public static final String VENDORTYPE_LIST = "vendorList";
  public static final String FROM_COST_RANGE = "FROM_COST_RANGE";
  public static final String TO_COST_RANGE = "TO_COST_RANGE";
  public static final String ALL = "All";
  public static final String COST_PRICE = "COST_PRICE";

  public static final String FLAGLIST = "flagList";

  public static final String HALMARK_CHARGES = "halmarkCharges";

  public static final String CREDIT_TO_ACC_FOR_EXISTING_ORD_SUCCESS =
      "Credit to Accounts for the order are attached successfully";

  public static final String SALE_BILL = "saleBill";
  public static final String ORDER_TYPE = "orderType";

  // Stone Article Master
  public static final String SAM_MODE = "samMode";
  public static final String SAM_LISTING = "listing";
  public static final String SAM_CREATE = "create";
  public static final String SAM_EDIT = "edit";

  public static final String SUCCESS = "success";

  // Customer Address
  public static final String STATE_LIST = "stateList";
  public static final String CITY_LIST = "cityList";
  public static final String COUNTRY_ID = "countryId";
  public static final String STATE_ID = "stateId";
  public static final String COUNTRY_LIST = "countries";

  // Comapny Master
  public static final String BUSINESS = "business";
  public static final String GROUPS = "groups";
  public static final String COMPANY = "company";
  public static final String CREATEDON = "createdon";

  // SPGroup Master
  public static final String REACH_OUT = "reachout";
  public static final String STORES = "stores";
  public static final String ZONE = "zoneCode";

  public static final String SAVINGS_PLAN_PDC_PRINT = "No records to Print";
  public static final String REGION_LIST = "rList";
  public static final String LOCATION_LIST = "locationList";
  public static final String ALL_STORE_TYPES = "sTypeList";
  public static final String ALL_BANKS = "bankList";
  public static final String STORE_LIST = "sList";
  public static final String DC_LIST = "dcList";
  public static final String EXPORT = "export";
  public static final String WEIGHT_RANGE = "weightRange";
  public static final String TV_ACK_AFTER_CANCEL =
      "Unable to Acknowledge as Order is Already Cancelled";
  public static final String MUP_TYPES = "mup_types";
  public static final Double PURITYVALUE = 99.99;
  public static final String STONE_ACCOUNT_LOCATION = "Stone_Account_Location";
  public static final String ROUND_OF = "round_of";
  public static final String MC_CONFIG = "mc_config";
  public static final String MTAL_PRICE = "metal_price";
  public static final String REFINER = "refinerCode";
  public static final String DCLIST = "dcList";
  public static final String ORDER_LIST = "order_list";
  public static final String CUSTOMERS = "customer_list";
  public static final String MUP_TYPE = "muptype";
  public static final String STORE_OR_DCS = "dcOrStore";

  // Email Contstants For Handover Slip
  public static final String DC = "DC";
  public static final String CUSTMOBNO = "custMobNo";
  public static final String SAVINGPLANSCHEME = "savingplanschme";

  // Segment Constrants

  public static final String YES = "YES";
  public static final String NO = "NO";


  // Capturing unsetting Constants

  public static final String STOCK = "Stock";
  public static final String PURCHASEBILL = "PurchaseBill";
  public static final String TRANSFERS = "Transfers";
  public static final String T = "T";
  public static final String ORDER = "Order";
  public static final String GR = "GR";
  public static final Double METALPUIRITY = 99.9;
  public static final Double PERCENTAGE = 100.00;

  public static final String PARCEL_IDS = "parcelIDs";
  public static final String STONE_RECEIPTS = "stoneReceipts";
  public static final int PAGE_SIZE5 = 5;

  // Bullion MRV Constants

  public static final String GSTN_LIST = "GstnNoList";

  // Weight Constant

  public static final String DEFAULT_WT = "0.000";

  // Parameter Constant
  public static final String HCWIHOUTDESIGN = "RELEASE";
  public static final String HCWITHDESIGN = "RELEASE_WITH_DESIGN";
  public static final String VALUATIONCHARGE = "VALUATION_CHARGE";
  public static final String TOLERANCE_GOLD = "TOLERANCE_GOLD";
  public static final String TOLERANCE_PLATINUM = "TOLERANCE_PLATINUM";
  public static final String TOLERANCE_SILVER = "TOLERANCE_SILVER";
  public static final String TOLERANCE_DIAMOND = "TOLERANCE_DIAMOND";
  public static final String TOLERANCE_OTHER_STONES = "TOLERANCE_OTHERS_STONES";
  public static final String TOLERANCE_PRECIOUS_STONE =
      "TOLERANCE_PRECIOUS_STONES";

  // RoleFunction Constant

  public static final String MENU_ID = "menuId";
  public static final String ROLE_ID = "roleId";
  public static final String ADRSTONE = "DIMLRB";

  public static final String REGISTER = "register";

  // Approval Bill Settlement

  public static final String SETTLE_OF_APPROVAL_BILL_LIST = "appBillList";

  public static final String SETTLE_OF_APPROVAL_BILL_NET_PAYABLE_AMOUNT =
      "netPayableAmount";

  public static final String SETTLE_OF_APPROVAL_BILL_HEADER = "spVoucherAmount";

  // renumbering GR

  public static final String REFDOC_TYPE = "refTypes";
  public static final String REFDOC_TYPE_SRL_NOS = "srlNos";
  public static final String RENUM_GR_DETAILS = "renumGrDetails";
  public static final String RENUM_GR_VENDORS = "renumGrVendors";
  public static final String RENUM_GR_STONE_ACC_DETAILS =
      "renumGrStoneAccDetails";
  public static final String RENUM_GR_STONE_OR_DC = "listOfStoneOrDc";
  public static final String RENUM_ZERO = "0";
  public static final String RENUM_GR_IGR_NOS_AND_REFNOS = "igrNosAndRefNos";
  public static final String RENUM_GR_SEARCH = "renumGrSearch";


  // Order Settlement tax

  public static final String HSN_HC = "HC";
  public static final String LB_TAX = "LC";
  public static final String METAL_TAX = "LRM";
  public static final String CASH_BENEFIT = "CB";
  public static final String AMR = "AMR";
  public static final String ADR = "ADR";
  public static final String MCWV = "MCWV";

  public static final String PL = "PL";


  // Parameter Constants

  public static final String SBENEFIT = "SP_BENEFIT";
  public static final String COLLECTION_NAME = "collectionName";


  // FAS

  public static final String POST = "post";

  public static final String FAS_ALREADY_TRANSFERED = "already";

  // convert comma seperated values

  public static final String COMMA_SEPERATED_WITH_SINGLE_QUOTES =
      "CommaSeparatedWithSingleQuotes";

  // savings plan closure Bill Type

  public static final String SETTLEMENT_OF_APPROVAL_BILL =
      "SettlementOfApprovaBill";
  public static final String CLOSURE_DETAILS = "spClosureDetails";

  public static final String SP_ADR_STONE_CUT_GRADE = "EX";

  public static final String SP_ADR_STONE_COLOR = "EF";

  public static final String SP_ADR_STONE_CLARITY = "IF-VVS";

  public static final String SP_ADR_STONE_WEIGHT_RANGE = "0.010-0.068";

  public static final String SP_MCW = "MCW";

  // GRV TO IGR DETAILED QUERY Type Constants

  public static final String ONLOAV_LOV = "onloadLov";

  public static final String IGR_DETAILS = "IGRDetails";

  public static final String ACCESSORY_DETAILS = "IGRAccDetails";

  public static final String MRV_NO_LIST = "MrvNoList";

  public static final String IGR_NO_LIST = "IgrNolist";

  public static final String MRV_SRL_NUMBERS_LIST = "mrvSerialNos";

  public static final String GRV_NO = "GrvNo";

  // Savings plan closure on Sale Bill

  public static final String LOOSE_STONE = "LooseStone";

  public static final String DIS_ASSEMBLE = "DisAssemble";

  // customer related Stones And Accessory
  public static final String CUSTOMER_DIAMOND = "CD";

  public static final String CUSTOMER_ACCESSORY = "CA";

  // metal segment codes
  public static final String SEGMENT_TYPE_GOLD = "G";

  public static final String SEGMENT_TYPE_PLATINUM = "P";

  public static final String SEGMENT_TYPE_DIAMOND = "D";

  public static final String SEGMENT_TYPE_SILVER = "S";

  // segment types
  public static final String SEGMENT_TYPE_METAL = "M";

  public static final String SEGMENT_TYPE_STONE = "S";

  public static final String SEGMENT_TYPE_ACCESSORY = "AC";

  // stone segment codes
  public static final String SEGMENT_TYPE_STONE_SEG_DI = "DI";

  public static final String SEGMENT_TYPE_STONE_SEG_PS = "PS";

  public static final String SEGMENT_TYPE_STONE_SEG_OS = "OS";

  public static final String SIZE_LENGTH_DIA_LIST = "SLDList";


  // loyalty customer details

  public static final String LOYALTY_CUSTOMER_DETAILS =
      "loyaltyCustomerDetails";

  // Rotation Report
  public static final String ROTATION_PLATINUM_SEGMENT_TYPE = "PLAIN_PLATINUM";
  public static final String ROTATION_DIAMOND_SEGMENT_TYPE = "DIAMOND_PLATINUM";
  public static final String ROTATION_PLAIN_PLATINUM_CAT_CODE = "PP";
  public static final String ROTATION_REPORT_TYPE = "ReportTypes";


  // PSQ

  public static final String ROLE_LIST = "roleList";

  public static final String All_YEARS = "allYears";

  public static final String YEAR_MONTHS = "yearMonths";

  public static final String NO_OF_DAYS_PRESENT_ABSCENT = "noOfDaysPresentAB";

  public static final String PSQ_TYPE = "PSQType";

  public static final String SEARCH_ATTENDANCE_PSQ_TYPE = "AttendancePSQ";

  public static final String ATTENDANCE_PSQ_CREATE = "PSQCreate";

  public static final String ATTENDANCE_PSQ_UPLOAD = "PSQUpload";

  // Portal

  public static final String SALE_PORTAL = "Sales";

  public static final String OE_PORTAL = "OE";

  // Rough Cash Book

  public static final int ALL_MONTHS = 12;
  public static final String CASHIER_ROLE_NAME = "CAS";
  public static final String RCB_OPENING_BALANCE = "OB";
  public static final String RCB_CLOSING_BALANCE = "CLB";
  public static final String RCB_CB_SYSTEM = "ClosingBalanceAsPertheSystem";
  public static final String RCB_CB_CASHIER_DECLARATION =
      "ClosingBalanceAsPertheCashierDeclaration";
  public static final String RCB_SALE_PARTICULAR_WTS = "SalesParticulars";
  public static final String RCB_SP_PARTICULARS_FOR_THE_DAY =
      "SavingsPlanenrolledforthedayNew";
  public static final String RCB_SP_PARTICULARS_RECEIPTS_FOR_THE_DAY =
      "SavingsPlanreceiptforthedayExisting";
  public static final String RCB_SP_PARTICULARS_ORDERS_TAKEN_FOR_THE_DAY =
      "OrderstakenforthedayNew";
  public static final String SEARCH_ROUGH_CASH_BOOK_TYPE = "RCBType";
  public static final String RCB_SALE_OF_STOCK_ITEM = "Sale Of Stock Item";
  public static final String RCB_SETTLEMENT_OF_APPROVAL_BILL =
      "Settlement Of Approval Bill";
  public static final String RCB_SETTLEMENT_OF_ORDER = "Settlement Of Order";


  // Intimation Reminder

  public static final String INTIMATION_TO_REMINDER = "INTIMATION_TO_REMINDER";
  public static final String SP_INTIMATION_TO_REMINDER_DAYS =
      "SP_INTIMATION_REMINDER_DAYS";
  public static final String BETWEEN_REMINDER = "BETWEEN_REMINDER";
  public static final String INTIMATION_REMINDER_BATCH = "Batch";
  public static final String INTIMATION_REMINDER_ROLE_NOT_FOUND =
      "Role Not Found";
  public static final String INTIMATION_REMINDER_INTIMATION_DATED =
      "intimation dated";
  public static final String INTIMATION_REMINDER_INR = "INR.";
  public static final String INTIMATION_REMINDER_MODE_ALL = "IRModesAll";
  public static final String INTIMATION_REMINDER_TYPE_ALL = "IRTypesAll";
  public static final String INTIMATION_REMINDER_REF_TYPS_ALL =
      "IRRefDocTypesAll";

  public static final String APPROVA_BILL_REMINDER_INTERVAL_DAYS =
      "AB_REMINDER_INTERVAL_DAYS";

  public static final String STOCK_QUERY_BASED_STAUS_PRICE_RANGE = "PriceRange";

  public static final String STOCK_QUERY_BASED_STAUS_STONE_COMBINATION =
      "StoneCombinationList";

  public static final String STOCK_QUERY_BASED_STAUS_ITEM_DETAILS =
      "ItemDetails";

  public static final String STOCK_QUERY_BASED_STAUS_CERTIFICATE_DETAILS =
      "CertificateDetails";

  public static final String STOCK_QUERY_BASED_STAUS_ACCESSORY_DETAILS =
      "AccessoryDetails";

  public static final String STOCK_QUERY_BASED_STAUS_ITEM_HISTORY_DETAILS =
      "ItemHistory";

  public static final String STOCK_QUERY_BASED_STAUS_GRV = "GRV";

  public static final String STOCK_QUERY_BASED_STAUS_IGR = "IGR";

  public static final String GOLD_SILVER_SEGMENT_TYPE = "GOLD_SILVER";

  // Ageing Analysis

  public static final String AGEING_ANALYSIS_LOOSE_STONE_ACCESSORY =
      "LooseStoneAccessoryType";

  public static final String AGEING_ANALYSIS_LOOSE_STONE = "LSS";

  public static final String AGEING_ANALYSIS_LOOSE_ACCESSORY = "AS";

  // Order Statement Of Account

  public static final String ORDER_STATEMENT_OF_ACCOUNT_ALL_ORDERS =
      "ALLORDERS";

  public static final String ORDER_STATEMENT_OF_ACCOUNT_ALL_INDIVIDUAL =
      "INDIVIDUAL";

  public static final String ORDER_STATEMENT_OF_ACCOUNT_BATCH_RUN_PARAMETER =
      "STATEMENT_ACCOUNT_BATCH_RUN_INTERVAL";

  public static final String ORDER_STATEMENT_DETAILS =
      "Order_Statement_Details";

  public static final String ORDER_STATEMENT_TAX_DETAILS =
      "OrderStmntTaxDetails";

  public static final String ORDER_STATEMENT_ORDER_CREDIT_ACCOUNT =
      "OrderCreditAccountDetails";

  public static final String ORDER_STATEMENT_ADVANCE_DETAILS = "AdvanceDetails";

  public static final String ORDER_STATEMENT_RATE_DETAILS =
      "Order_Statement_Rate_Details";

  public static final String GREETING_CUSTOMER_TEMPLATE_DETAILS =
      "GC_Template_Details";

  public static final String GREETING_CUSTOMER_CREATE_ONLOAD =
      "CreateOnLoadLov";

  public static final String GREETING_CUSTOMER_CREATE_TEMPLATE =
      "CreateTemplate";

  public static final String GREETING_CUSTOMER_BIRTH_ANN =
      "CustBirthAnnEmailGreeting";

  public static final String GREETING_TYPE = "GreetingType";

  public static final String GREETING_CUSTOMER_TYPE = "GreetingCustType";

  public static final String SEARCH_GREETING_CUSTOMER =
      "SearchGreetingCustomer";

  public static final String FROM_DATE = "fromDate";

  public static final String TO_DATE = "toDate";

  public static final String VENDOR_MAS_MA_DETAILS = "maDetails";

  public static final String VENDOR_MAS_RM = "RM";

  public static final String VENDOR_MAS_FG = "FG";

  public static final String VENDOR_MAS_ISSUE_FG = "IssueFG";

  public static final String VENDOR_MAS_ISSUE_OFFSET = "offset";

  public static final String VENDOR_MAS_ISSUE_RM = "IssueRM";

  public static final String VENDOR_MAS_ISSUE_RM_REGULAR = "IssueRMRegular";

  public static final String VENDOR_MAS_ISSUE_RM_SYSTEM = "IssueRMSystem";

  public static final String VENDOR_MAS_ISSUE_FG_REGULAR = "IssueFGRegular";

  public static final String VENDOR_MAS_VENDOR_RETURN = "vendorReturn";

  public static final String VENDOR_MAS_ISSUE_FG_SYSTEM = "IssueFGSystem";

  public static final String VENDOR_MAS_RECEIPT_FG = "ReceiptFG";

  public static final String VENDOR_MAS_RECEIPT_RM = "ReceiptRM";

  public static final String VENDOR_MAS_RECEIPT_RM_REGULAR = "ReceiptRMRegular";

  public static final String VENDOR_MAS_RECEIPT_SYSTEM = "ReceiptRMSystem";

  public static final String VENDOR_MAS_RECEIPT_FG_REGULAR = "ReceiptFGRegular";

  public static final String VENDOR_MAS_RECIPT_FG_SYSTEM = "ReceiptFGSystem";

  public static final String VENDOR_MAS_REPAIR_ISSUE = "RepairIssue";

  public static final String VENDOR_MAS_REPAIR_RECEIPT = "RepairReceipt";

  public static final String VENDOR_MAS_SAMPLE_ISSUE = "SampleIssue";

  public static final String VENDOR_MAS_SAMPLE_RECEIPT = "SampleReceipt";

  public static final String VENDOR_MAS_ADJ_VOUCHER = "AdjVoucher";

  public static final String VENDOR_MAS_ADJ_VOUCHER_DEBIT_RECEIPT =
      "AdjVoucherDebitReceipt";

  public static final String VENDOR_MAS_ADJ_VOUCHER_CREDIT_ISSUE =
      "AdjVoucherCreditIssue";

  public static final String VENDOR_MAS_OPENING_BAL_FG = "OpenBalFG";

  public static final String VENDOR_MAS_OPENING_BAL_RM = "OpenBalRM";

  public static final String VENDOR_MAS_MASTER_CLOSING_BAL_FG =
      "ClosingBalMSTFG";

  public static final String VENDOR_MAS_MASTER_CLOSING_BAL_RM =
      "ClosingBalMSTRM";

  public static final String VENDOR_MAS_TRA_ISSUE_FG = "TraIssueFG";

  public static final String VENDOR_MAS_TRA_RECEIPT_FG = "TraReceiptFG";

  public static final String VENDOR_MAS_TRA_ISSUE_RM = "TraIssueRM";

  public static final String VENDOR_MAS_TRA_RECEIPT_RM = "TraReceiptRM";

  // Vendor MAS Stone

  public static final String VENDOR_MAS_STONE_DIA = "DIMASDetails";

  public static final String VENDOR_MAS_STONE_BALANCE = "Vmas_Stone_Detail";

  public static final String VENDOR_MAS_STONE_ISSUE_DETAILS =
      "VmasStoneIssDetails";

  public static final String VENDOR_MAS_STONE_RECEIPT_DETAILS =
      "VmasStoneRecptDetails";

  public static final String VENDOR_MAS_STONE_DIFF_DETAILS =
      "VmasStoneDiffDetails";

  public static final String VENDOR_MAS_STONE_SUMMARY_DETAILS =
      "VmasStoneSummary";


  public static final String VENDOR_MAS_STONE_ISSUE = "Goods Issue Voucher";

  public static final String VENDOR_MAS_STONE_RECEIPT = "Goods Receipt Voucher";

  public static final String VENDOR_MAS_STONE_ADJ_CREDIT =
      "Stone Difference Voucher(Credit)";

  public static final String VENDOR_MAS_STONE_ADJ_DEBIT =
      "Stone Difference Voucher(Debit)";

  public static final String LOYALTY_CUST_WEL_LETT_VIEW = "view";

  public static final String LOYALTY_CUST_WEL_LETT_EDIT = "edit";

  public static final String LOYALTY_CUST_WEL_LETT_DELETE = "delete";

  public static final String LOYALTY_CUST_WEL_LETT_NOT_REG =
      "Customer Is Not Register Under Loyalty Program";

  public static final String LOYALTY_CUST_WEL_LETT_ISS_LOY =
      "Please Issue Loyalty card to customer";

  public static final String LOYALTY_CUST_WEL_LETT_DUPLICATE =
      "Welcome Letter already Generated for Customer";

  public static final String LOYALTY_CUST_WEL_LETT_ACCRUED = "Accrued";

  public static final String VENDOR_MAS_STONE_WEIGHT_RANGE_WISE =
      "VmasWeghtRangeWiseDetails";

  public static final String LOYALTY_CUST_STATEMENT_FROM_MONTH = "fromMonth";

  public static final String LOYALTY_CUST_STATEMENT_FROM_YEAR = "fromYear";

  public static final String LOYALTY_CUST_STATEMENT_TO_MONTH = "toMonth";

  public static final String LOYALTY_CUST_STATEMENT_TO_YEAR = "toYear";

  public static final String LOYALTY_STATEMENT_CARD_NO = "loyaltyCardNo";

  public static final String LOYALTY_STATEMENT_CUST_TYPE = "custType";

  public static final String LOYALTY_STATEMENT_CRM_PERSON_NAME =
      "CRM_PERSON_NAME";

  public static final String LOYALTY_STATEMENT_CRM_PHONE_NO = "CRM_PHONE_NO";

  public static final String LOYALTY_STATEMENT_PERIOD = "Period";

  public static final String LOYALTY_STATEMENT_CALL = "Call";

  public static final String LOYALTY_STATEMENT_CONTACT = "Contact No";

  // Vendor Reminder
  public static final String VENDOR_REMINDER_INTIMAITON =
      "VEN_MAT_PENDING_DAYS";

  public static final String VENDOR_REMINDER = "PSR_PENIDNG_DAYS";

}



;
