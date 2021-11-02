package com.loan.data.types;

import java.util.HashMap;
import java.util.Map;

public enum Permission {
    CANADD(true), CANDELETE(true),CANSEARCH(true),CANPRINT(true),CANEXPORT(true),CANEDIT(true),CANADJUSTVOUCHERPOSTING(true);

    public static Map<String, Boolean> getAllTypes() {
        return allTypes;
    }

    public static Permission valueOfKey(final Boolean value) {
        for (final Permission t : values()) {
            if (t.name().equals(value)) {
                return t;
            }
        }
        return null;
    }

    public static Permission valueOfName(final Boolean value) {
        for (final Permission t : values()) {
            if (t.getType().equals(value)) {
                return t;
            }
        }
        return null;
    }

    private Boolean type;

    private static Map<String, Boolean> allTypes = new HashMap<String, Boolean>();

    static {
        for (final Permission t : values()) {
            allTypes.put(t.name(), t.getType());
        }
    }

    private Permission(final Boolean type) {
        this.type = type;
    }

    public Boolean getType() {
        return this.type;
    }

}
