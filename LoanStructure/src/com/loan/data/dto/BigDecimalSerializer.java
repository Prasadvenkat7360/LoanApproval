package com.loan.data.dto;

import java.io.IOException;
import java.math.BigDecimal;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
/**
 * 
 * @author manoranjan.mishra
 *
 *This class used to serialize  Where data type is BigDecimal 
 *
 *and return a String 
 */
public class BigDecimalSerializer extends JsonSerializer<BigDecimal> {

  @Override
  public void serialize(BigDecimal value, JsonGenerator jgen,
      SerializerProvider provider) throws IOException, JsonGenerationException {
    if (null == value) {
      
      jgen.writeString("0.000");
    }
    else {
      
      jgen.writeString(value.setScale(3, BigDecimal.ROUND_HALF_UP).toString());
    }
  }



}
