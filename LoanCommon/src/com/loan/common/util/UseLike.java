package com.loan.common.util;

public class UseLike {

	public static Object convertUseLike(Object obj) {

		if (obj instanceof String) {
			StringBuilder sb = new StringBuilder("%");
			sb.append(obj);
			sb.append("%");
			
			return sb.toString();
		}
		return obj;

	}
}
