package com.loan.common.serializer;

import java.io.IOException;
import java.math.BigDecimal;
import java.text.DecimalFormat;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

public class PuritySerializer extends JsonSerializer<BigDecimal> {
  private final static DecimalFormat decimalFormat = new DecimalFormat("0.00");

  @Override
  public void serialize(final BigDecimal value, final JsonGenerator jgen,
      final SerializerProvider arg2) throws IOException,
      JsonProcessingException {
    if (value != null) {
      jgen.writeString(decimalFormat.format(value.doubleValue()));
    } else {
      jgen.writeString(decimalFormat.format(0));
    }
  }
}
