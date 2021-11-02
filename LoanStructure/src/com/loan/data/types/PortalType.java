package com.loan.data.types;

import java.util.HashMap;
import java.util.Map;

public enum PortalType {
	OE("Order Execution"), SALES("SALES"), JES_SCHEDULER("JES_SCHEDULER");

	public static Map<String, String> getAllTypes() {
		return allTypes;
	}

	public static PortalType valueOfKey(final String value) {
		for (final PortalType t : values()) {
			if (t.name().equals(value)) {
				return t;
			}
		}
		return null;
	}

	public static PortalType valueOfName(final String value) {
		for (final PortalType t : values()) {
			if (t.getType().equals(value)) {
				return t;
			}
		}
		return null;
	}

	private String type;

	private static Map<String, String> allTypes = new HashMap<>();

	static {
		for (final PortalType t : values()) {
			allTypes.put(t.name(), t.getType());
		}
	}

	private PortalType(final String type) {
		this.type = type;
	}

	public String getType() {
		return this.type;
	}

}
