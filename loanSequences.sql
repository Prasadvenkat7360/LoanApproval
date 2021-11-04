--------------------------------------------------------
--  File created - Wednesday-November-03-2021   
--------------------------------------------------------
DROP SEQUENCE "LOAN_APPROVAL"."EMPLOYEE_SEQ";
DROP SEQUENCE "LOAN_APPROVAL"."FUNCTION_SEQ";
DROP SEQUENCE "LOAN_APPROVAL"."MENU_SEQ";
DROP SEQUENCE "LOAN_APPROVAL"."ROLE_FUNCTION_SEQ";
DROP SEQUENCE "LOAN_APPROVAL"."ROLE_SEQ";
--------------------------------------------------------
--  DDL for Sequence EMPLOYEE_SEQ
--------------------------------------------------------

   CREATE SEQUENCE  "LOAN_APPROVAL"."EMPLOYEE_SEQ"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 323 CACHE 20 NOORDER  NOCYCLE ;
--------------------------------------------------------
--  DDL for Sequence FUNCTION_SEQ
--------------------------------------------------------

   CREATE SEQUENCE  "LOAN_APPROVAL"."FUNCTION_SEQ"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 258 CACHE 20 NOORDER  NOCYCLE ;
--------------------------------------------------------
--  DDL for Sequence MENU_SEQ
--------------------------------------------------------

   CREATE SEQUENCE  "LOAN_APPROVAL"."MENU_SEQ"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 21 CACHE 20 NOORDER  NOCYCLE ;
--------------------------------------------------------
--  DDL for Sequence ROLE_FUNCTION_SEQ
--------------------------------------------------------

   CREATE SEQUENCE  "LOAN_APPROVAL"."ROLE_FUNCTION_SEQ"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1990 CACHE 20 NOORDER  NOCYCLE ;
--------------------------------------------------------
--  DDL for Sequence ROLE_SEQ
--------------------------------------------------------

   CREATE SEQUENCE  "LOAN_APPROVAL"."ROLE_SEQ"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 146 CACHE 20 NOORDER  NOCYCLE ;
