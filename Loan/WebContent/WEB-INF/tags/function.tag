<%@ tag dynamic-attributes="parameters" language="java" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<%@ attribute name="name" required="true" description="function name" %>
<%@ attribute name="params" required="false" description="comma separated list of parameters" %>
<%@ attribute name="action" required="true" description="define or invoke" %>
<%@ attribute name="target" required="false" description="target object on which to invoke the function" %>


<c:choose>
<c:when test="${action eq 'define'}">
	function ${name}(${params}){
	 <jsp:doBody/>
	}
</c:when>
<c:when test="${action eq 'invoke'}">
	<c:if test="${! empty target}"> ${target}.</c:if>${name}(${params});
</c:when>
</c:choose>