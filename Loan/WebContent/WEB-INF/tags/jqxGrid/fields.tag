<%@ tag language="java" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

		[
			<c:set var="myVar"> 
				<jsp:doBody/>
			</c:set>
			<c:set var="myVar1" value="${fn:join(fn:split(fn:trim(myVar),'}'),'},')}"/>
			<c:choose>
				<c:when test="${fn:endsWith(myVar1,'}')}"> ${myVar1} </c:when>
				<c:when test="${fn:endsWith(myVar1,',')}"> ${fn:substring(myVar1,0,fn:length(myVar1))} </c:when>
				<c:when test="${!fn:endsWith(myVar1,'}')}"> ${myVar1}} </c:when>
			</c:choose>
		] // end of fields
		
		
		