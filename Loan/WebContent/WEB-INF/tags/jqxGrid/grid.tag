<%@ tag dynamic-attributes="otherAttribs" language="java" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<%-- <%@ attribute name="varName" required="true" description="variable Name"%> --%>
<%@ attribute name="source" required="true" description=""%>
<%@ attribute name="columns" required="true" fragment="true" description=""%>
<%@ attribute name="selector" required="true" rtexprvalue="true" description=""%>
<%@ attribute name="pageable" required="false" rtexprvalue="true" description="Possible Values: POST or GET"%>
<%@ attribute name="sortable" required="false" rtexprvalue="true" description="A string containing the Id data field"%>
<%@ attribute name="width" required="false" rtexprvalue="true" description="A string describing where the data begins and all other loops begin from this element"%>
<%@ attribute name="editable" required="false" rtexprvalue="true" description="A string describing the information for a particular record"%>
<%@ attribute name="filterable" required="false" fragment="true" description="An array describing the fields in a particular record. Each datafield must define the following members"%>
<%@ attribute name="selectionmode" required="false" rtexprvalue="true" description=" specifies the mapping char. By default it is '>'."%>
<%@ attribute name="columnsresize" required="false" rtexprvalue="true" description="determines the foreign collection associated to the data field"%>
<%@ attribute name="scrollmode" required="false" rtexprvalue="true" description="specifies the column delimiter when the data source is 'tab' or 'csv'. The default value for 'tab' is '\t' and the default value for 'csv' is ','"%>
<%@ attribute name="scrollbarsize" required="false" rtexprvalue="true" description="specifies the rows delimiter when the data source is 'tab' or 'csv'. The default value is '\n'"%>
<%@ attribute name="virtualmode" required="false" description="Local data array"%>


$("${selector}").jqxGrid(
                 {
                     source: ${source},
                     columns : <jsp:invoke fragment="columns" />
                     <c:if test="${!empty width}">,width: '${width}' </c:if>
                     <c:if test="${!empty editable}">,editable: '${editable}' </c:if>
                     <c:if test="${!empty sortable}">,sortable: '${sortable}' </c:if>
                     <c:if test="${!empty pageable}">,pageable: '${pageable}' </c:if>
                     <c:if test="${!empty filterable}">,filterable: '${filterable}' </c:if>
                     <c:if test="${!empty selectionmode}">,selectionmode: '${selectionmode}' </c:if>
                     <c:if test="${!empty columnsresize}">,columnsresize: '${columnsresize}' </c:if>
                     <c:if test="${!empty scrollmode}">,scrollmode: '${scrollmode}' </c:if>
                     <c:if test="${!empty scrollbarsize}">,scrollbarsize: '${scrollbarsize}' </c:if>
                     <c:if test="${!empty virtualmode}">,virtualmode: '${virtualmode}' </c:if>
                     <c:if test="${fn:length(otherAttribs) gt 0 }">
                       <c:forEach var="prop" items="${otherAttribs}">
                       ,${prop.key} : ${prop.value}
                       </c:forEach>
                     </c:if>
                 });