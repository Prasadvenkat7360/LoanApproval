<%@ tag language="java" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<%@ attribute name="name" required="true" description="function name" %>
<%@ attribute name="params" required="false" description="comma separated list of parameters" %>

${name}(${params});