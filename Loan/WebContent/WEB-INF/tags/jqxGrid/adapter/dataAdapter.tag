<%@ tag dynamic-attributes="otherAttribs" language="java" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<%@ attribute name="varName" required="true" description="variable Name"%>
<%@ attribute name="source" required="true" description="metadata for model"%>


var ${varName} = new $.jqx.dataAdapter(${source},{ 
	 <c:if test="${fn:length(otherAttribs) gt 0 }">
		<c:forEach var="prop" items="${otherAttribs}" varStatus="status">
		${prop.key} : ${prop.value}
		<c:if test="${! status.last }"> ,</c:if>
		</c:forEach>
	</c:if>
	}
);



<!-- async: By default, all requests are sent asynchronously (i.e. this is set to true by default). If you need synchronous requests, set this option to false. When the binding is "asynchronous", the data binding operation occurs in parallel and the order of completion is not guaranteed. -->
<!-- autoBind - Automatically calls the dataAdapter's dataBind method on initialization. The default value is false, because the widgets that use the dataAdapter plugin, invoke its dataBind method. -->
<!-- contentType: Use this option, If you want to explicitly pass in a content-type. Default is "application/x-www-form-urlencoded". -->
<!-- processData: A callback function which allows you to modify the default data object sent to the server. -->
<!-- formatData:  -->
<!-- beforeSend(jqXHR, settings): A pre-request callback function that can be used to modify the jqXHR -->
<!-- loadError(jqXHR, status, error): A callback function called when the request has failed. -->
<!-- downloadComplete(edata, textStatus, jqXHR): A callback function which is called if the request succeeds. The function gets passed three arguments: The data returned from the server, formatted according to the dataType parameter; a string describing the status; and the jqXHR. -->
<!-- beforeLoadComplete: -->
