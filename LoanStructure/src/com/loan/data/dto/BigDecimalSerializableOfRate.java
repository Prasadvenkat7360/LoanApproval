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
 *This class used serialize BigDecimal Rate values
 *
 */
public class BigDecimalSerializableOfRate extends JsonSerializer<BigDecimal> {

  @Override
  public void serialize(BigDecimal value, JsonGenerator jgen,
      SerializerProvider provider) throws IOException, JsonGenerationException {
    if (null == value) {
      // write the word 'null' if there's no value available
      jgen.writeString("0.00");
    }
    else {
      
      jgen.writeString(value.setScale(2, BigDecimal.ROUND_HALF_UP).toString());
    }
  }

}
