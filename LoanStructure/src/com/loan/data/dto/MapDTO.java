
package com.loan.data.dto;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonView;

/**
 * The generic rest result
 *
 */
public class MapDTO extends DTO implements Serializable {

	public interface MapDTOView {
	};

	public interface EmployeeRoleView {
	};

	public interface EmployeeView {
	};
	
	public interface RoleView{
		
	};

	static final long serialVersionUID = 1L;;

	@JsonView({ MapDTOView.class, EmployeeRoleView.class, EmployeeView.class,RoleView.class })
	private String resCode = "1";

	@JsonView({ MapDTOView.class, EmployeeRoleView.class, EmployeeView.class ,RoleView.class })
	private String mesgStr = "";

	@JsonView({ MapDTOView.class, EmployeeRoleView.class, EmployeeView.class,RoleView.class })
	private Map<String, Object> payload = new HashMap<>();

	public String getMesgStr() {
		return this.mesgStr;
	}

	public Map<String, Object> getPayload() {
		return this.payload;
	}

	public String getResCode() {
		return this.resCode;
	}

	public void setMesgStr(final String mesgStr) {
		this.mesgStr = mesgStr;
	}

	public void setPayload(final Map<String, Object> payload) {
		this.payload = payload;
	}

	public void setResCode(final String resCode) {
		this.resCode = resCode;
	}

}
