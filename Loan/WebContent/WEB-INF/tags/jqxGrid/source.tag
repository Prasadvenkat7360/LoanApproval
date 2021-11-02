<%@ tag dynamic-attributes="otherAttribs" language="java" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<%@ attribute name="varName" required="true" description="variable Name"%>
<%@ attribute name="datatype" required="true" description="the data's type. Possible values: 'xml', 'json', 'jsonp', 'tsv', 'csv', 'local', 'array'"%>
<%@ attribute name="url" required="false" rtexprvalue="true" description="A string containing the URL to which the request is sent"%>
<%@ attribute name="timeout" required="false" rtexprvalue="true" description="Aborts the data binding on timeout. The default value is null"%>
<%@ attribute name="method" required="false" rtexprvalue="true" description="Possible Values: POST or GET"%>
<%@ attribute name="id" required="false" rtexprvalue="true" description="A string containing the Id data field"%>
<%@ attribute name="root" required="false" rtexprvalue="true" description="A string describing where the data begins and all other loops begin from this element"%>
<%@ attribute name="record" required="false" rtexprvalue="true" description="A string describing the information for a particular record"%>
<%@ attribute name="fields" required="true" fragment="true" description="An array describing the fields in a particular record. Each datafield must define the following members"%>
<%@ attribute name="mapchar" required="false" rtexprvalue="true" description=" specifies the mapping char. By default it is '>'."%>
<%@ attribute name="values" required="false" rtexprvalue="true" description="determines the foreign collection associated to the data field"%>
<%@ attribute name="columnDelimiter" required="false" rtexprvalue="true" description="specifies the column delimiter when the data source is 'tab' or 'csv'. The default value for 'tab' is '\t' and the default value for 'csv' is ','"%>
<%@ attribute name="rowDelimiter" required="false" rtexprvalue="true" description="specifies the rows delimiter when the data source is 'tab' or 'csv'. The default value is '\n'"%>
<%@ attribute name="localdata" required="false" description="Local data array"%>
<%@ attribute name="contentType" required="false" description="request context type . ex: application/json"%>
<%@ attribute name="requestData" required="false" description="request data . usually POST data"%>

var ${varName} = {

datatype: '${datatype}',
datafields: <jsp:invoke fragment="fields" />
<c:if test="${!empty url}">,url: '${url}' </c:if>
<c:if test="${!empty timeout}">,timeout: ${timeout} </c:if>
<c:if test="${!empty method}">,type: '${method}' </c:if>
<c:if test="${!empty id}">,id: '${id}' </c:if>
<c:if test="${!empty root}">,root: '${root}' </c:if>
<c:if test="${!empty record}">,record: '${record}' </c:if>
<c:if test="${!empty mapchar}">,mapchar: '${mapchar}' </c:if>
<c:if test="${!empty values}">,values: '${values}' </c:if>
<c:if test="${!empty columnDelimiter}">,columnDelimiter: '${columnDelimiter}' </c:if>
<c:if test="${!empty rowDelimiter}">,rowDelimiter : '${rowDelimiter}' </c:if>
<c:if test="${!empty localdata}">,localdata : '${localdata}' </c:if>
<c:if test="${!empty contentType}">,contentType : '${contentType}' </c:if>
<c:if test="${!empty requestData}">,data : '${requestData}' </c:if>
					<c:if test="${fn:length(otherAttribs) gt 0 }">
                       <c:forEach var="prop" items="${otherAttribs}">
                       ,${prop.key} : ${prop.value}
                       </c:forEach>
                     </c:if>
};



