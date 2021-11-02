package com.loan.common.util;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;



@XmlRootElement(name = "results")
@XmlAccessorType(XmlAccessType.PROPERTY)

@XmlType(name = "", propOrder = { "draw", "recordsFiltered", "recordsTotal",
		"data", "errorMessages" })
public class QueryResultDTO<DTOType> implements Serializable {

	private static final long serialVersionUID = 1L;

	private Integer recordsTotal = 0;
	private Integer draw = 1;
	private Integer recordsFiltered = 0;
	private Integer numberOfPages = 0;

	private List<DTOType> data = new ArrayList<DTOType>();

	/**
	 * Contains error messages to be sent back to client
	 */
	private List<String> errorMessages;

	public QueryResultDTO() {
	}

	public QueryResultDTO(Integer maxCount, List<DTOType> dtos) {
		this.recordsTotal = maxCount;
		this.data.addAll(dtos);
	}

	public QueryResultDTO(String error) {
		this.addErrorMessage(error);
	}

	public Integer getRecordsTotal() {
		return recordsTotal;
	}

	public void setRecordsTotal(Integer maxCount) {
		this.recordsTotal = maxCount;
	}

	@XmlElement
	public List<DTOType> getData() {
		return data;
	}

	public void setData(List<DTOType> dtos) {
		this.data.clear();
		this.data.addAll(dtos);
	}

	public void addDtos(List<DTOType> dtos) {
		this.data.addAll(0, dtos);
		recordsTotal += dtos.size();
	}

	/**
	 * @return the errorMessages
	 */
	public List<String> getErrorMessages() {
		return errorMessages;
	}

	/**
	 * @param errorMessages
	 *            the errorMessages to set
	 */
	public void setErrorMessages(List<String> errorMessages) {
		this.errorMessages = errorMessages;
	}

	public void addErrorMessage(String message) {
		if (errorMessages == null) {
			errorMessages = new ArrayList<String>();
		}
		errorMessages.add(message);
	}

	public Integer getDraw() {
		return draw;
	}

	public void setDraw(Integer draw) {
		this.draw = draw;
	}

	public Integer getRecordsFiltered() {
		return recordsFiltered;
	}

	public void setRecordsFiltered(Integer recordsFiltered) {
		this.recordsFiltered = recordsFiltered;
	}

	public Integer getNumberOfPages() {
		numberOfPages = recordsTotal / Integer.valueOf(Constants.PAGE_SIZE);
		if (recordsTotal % Integer.valueOf(Constants.PAGE_SIZE) > 0) {
			numberOfPages = numberOfPages + 1;
		}

		return numberOfPages;
	}

	public void setNumberOfPages(Integer numberOfPages) {
		this.numberOfPages = numberOfPages;
	}

}
