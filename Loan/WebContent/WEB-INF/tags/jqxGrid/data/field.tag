<%@ tag language="java" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<%@ attribute name="name" required="true" description="" rtexprvalue="true" %>
<%@ attribute name="type" required="false" description="Possible values: 'string', 'date', 'number', 'float', 'int' and 'bool'"%>
<%@ attribute name="map" required="false" description=""%>
<%@ attribute name="format" required="false" %>

<%-- <%@ attribute name="defaultValue" required="false" description=""%> --%>
{'name' : '${name}'  <c:if test='${!empty type}'> 	, 'type' : '${type}' </c:if>  <c:if test='${!empty format}'> 	, 'format' : '${format}' </c:if> <c:if test='${!empty map}'> 	, 'map' : '${map}' </c:if>}