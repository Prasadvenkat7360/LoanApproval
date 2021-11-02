package com.loan.common.util;

import java.io.File;

public class FileCreate {

  public static void createFile() {

    File theDir = new File("C:\\Reports");

    // if the directory does not exist, create it
    if (!theDir.exists()) {
      boolean result = false;

      try {
        theDir.mkdir();
        result = true;
      }
      catch (SecurityException se) {
        // handle it
      }
      if (result) {
        
      }
    }
  }
}
